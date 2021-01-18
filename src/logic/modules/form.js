/**
 * Client-side form processing for Platframe.
 * @module form
 */

import {
    isFunction,
    isHTMLElement,
} from '../libs/types';

export default class Mailbox {

    constructor({
        // destructure settings
        id = 'form_1',
        form = 'form',
        carrier,
        destination,
        recaptcha,
        progress,
        success,
        failure,
    }) {
        // constructor body
        //
        // "id" identifies this form to Google's reCAPTCHA service
        // in its "action" field and is therefore restricted to
        // containing certain characters: [A-Za-z/_] It may also be
        // used to identify the form on the server side.
        this.id = id;
        // "form" identifies the <form> element as a selector that is
        // the intended target of an instance of this class.
        this.form = form;
        // "carrier" conveys the transport method (XHR or Fetch)
        this.carrier = carrier;
        // "destination" is the FQDN or path (if on the same host)
        // to the message processing service/API that sits between
        // the website and the IMAP/POP mail server.
        this.destination = destination;
        // Providing a "site key" to "recaptcha" will enable SPAM
        // support with reCAPTCHA v3.
        this.recaptcha = recaptcha;
        // "progress" receives a function that will run while contact
        // with the SMTP server is being established and until a final
        // outcome has been reached.
        this.progress = progress;
        // "failure" runs a function (if one was supplied) or
        // redirects to a page (if a FQDN or path string was given)
        // when the result of sending the message was a failure.
        this.failure = failure;
        // Same as above, but will run if the result was a success.
        this.success = success;

        // check if the designated form is in the current document
        if (document.querySelector(this.form)) {
            // get the DOM element of the given form identifier
            this.form = document.querySelector(this.form);
            // otherwise we have nothing to do on this page, so exit
        } else return null;

        // could we retrieve a valid DOM element on this page?
        if (isHTMLElement(this.form)) {

            // collect any 'required' fields
            if (this.form.querySelector('[required]')) {
                this.requiredFields = this.form.querySelectorAll('[required]');
            }

            // add reCAPTCHA API to DOM if specified
            if (this.recaptcha) this.addSpamService();

            // Attach submit event to the send action. Since we're in an event,
            // 'this' becomes the DOM node to which the event was attached,
            // however we need to retain access to the Mailbox context, so we
            // bind the send method to the current context.
            this.form.addEventListener('submit', this.send.bind(this));
        } else {
            // prerequisites not met, prevent creation of new instance
            throw new TypeError(`
                Expected a valid DOM node for the <form> element:
                incorrect identifier or missing <form> element.
            `);
        }
        // end constructor body
    }

    // Since the Mailbox service is intended for general
    // form usage, we will stick to using the POST method.
    static method = 'POST';

    // separate error messaging for the XMLHttpRequest API
    get xhrError() {
        /* eslint-disable no-undef */
        return `Error sending message: ${ request.response }
                Status: ${ request.statusText }`;
        /* eslint-enable no-undef */
    }

    addSpamService() {
        // provision API
        const head = document.querySelector('head');
        const dependency = document.createElement('script');
        const api = 'https://www.google.com/recaptcha/api.js?render=';

        dependency.setAttribute('async', '');
        dependency.setAttribute('src', `${ api }${ this.recaptcha }`);
        // attach as last child of <head>
        head.append(dependency);
    }

    // Reduce spam with Google reCAPTCHA (v3). Opting for an
    // asynchronous routine as it involves network action.
    runSpamFilter() {

        // exit early if not activated in instance
        if (!this.recaptcha) return null;

        return new Promise(resolve => {

            // Google reCAPTCHA API
            /* eslint-disable no-undef */
            grecaptcha.ready(() => {
                grecaptcha.execute(this.recaptcha,
                /* eslint-enable no-undef */
                    {
                        // identify action for server use
                        action: this.id
                    })
                    .then(token => {
                        // pass on reCAPTCHA session token
                        resolve(token);
                    });
            });
        });
    }

    validate() {
        if (this.requiredFields) {
            for (let field of this.requiredFields) {
                // checkValidity() is a native broswer API for
                // checking field data against any constraints
                if (field.checkValidity() === false) {
                    // no need to supply custom message as the
                    // browser takes care of alerting the user
                    return null;
                }
            }
        }
    }

    // intermediary step while communicating with server
    busy(response = {}) {
        // if defined, run "busy" callback
        if (isFunction(this.progress)) this.progress(response);
        // otherwise print a status update
        // eslint-disable-next-line no-console
        else console.info('Sending the message...');
    }

    // final steps that will act on the server's response
    done(action, response = {}) {

        if (action === 'failure') {
            if (this.failure) {
                // determine if it is defined as a Function or a string
                if (isFunction(this.failure)) return this.failure(response);
                // if a string, we know a redirect path was given
                else return window.location.replace(this.failure);
            }
            // else just log an error message to the console
            return console.error(response.description);
        }
        // if we've reached this point, we know it was a success
        if (this.success) {
            if (isFunction(this.success)) return this.success(response);
            else return window.location.replace(this.success);
        }
        // eslint-disable-next-line no-console
        console.info('Success: message delivered.');
    }

    // XMLHttpRequest routine for legacy vendors
    xhr(formData) {
        // prepare a network request to the mail server
        const request = new XMLHttpRequest();
        // opens a POST request, omitting the 3rd argument as it defaults to asynchronous
        request.open(Mailbox.method, this.destination);
        // cancel the request if unsuccessful after 5 seconds
        request.timeout = 5000;
        // send the request
        request.send(formData);
        // optional progress feedback functionality
        request.onprogress = this.busy;
        // called after the response is received (readyState 4)
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) this.done('success', request);
            else console.error(this.xhrError);
        };
        request.onerror = () => console.error(this.xhrError);
    }

    // the default
    fetch(formData) {
        // initiate the Fetch call
        const response = fetch(this.destination, {
            body: formData,
            method: Mailbox.method,
        });
        // Run the optional "progress" routine while
        // passing a reference to the response object.
        this.busy(response);

        response.then(data => {
            // handle potential network errors
            if (!data.ok) throw new Error(`HTTP error: ${ response.status }`);
            // parse the fetched stream into JSON
            return data.json();
        })
            .then(obj => {
            // run the relevant wrap-up functions
            // depending on the server's response
                if (obj.responseCode === 0) {
                    this.done('success', obj);
                } else {
                    this.done('failure', obj);
                }
            });
    }

    send(event) {
        // prevent the form's default action
        event.preventDefault();

        // validate fields
        this.validate();

        // run the spam prevention service
        this.runSpamFilter()
            .then((token) => {
                // The native FormData class uses the 'multipart/form-data' encoding
                // for the 'content-type' header sent with the request.
                const formData = new FormData(this.form);
                // attach the reCAPTCHA session token
                formData.append('token', token);
                // attach form's name to ID itself and reCAPTCHA action to the server
                formData.append('id', this.id);
                return formData;
            })
            .then(formData => {
            // did the user opt for the XHR transport?
                if (this.carrier === 'xhr') this.xhr(formData);
                // if not, use Fetch as the default API
                else this.fetch(formData);
            }).catch(error => console.error('Error:', error));
    }
}
