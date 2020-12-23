'use strict';

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
        id = 'form_1',
        form = 'form',
        carrier,
        destination,
        recaptcha,
        progress,
        success,
        failure,
    }) {
        this.id = id;
        this.form = form;
        this.carrier = carrier;
        this.destination = destination;
        this.recaptcha = recaptcha;
        this.progress = progress;
        this.failure = failure;
        this.success = success;

        if (document.querySelector(this.form)) {
            this.form = document.querySelector(this.form);
        } else return null;

        if (isHTMLElement(this.form)) {
            if (this.form.querySelector('[required]')) {
                this.requiredFields = this.form.querySelectorAll('[required]');
            }
            if (this.recaptcha) this.addSpamService();
            this.form.addEventListener('submit', this.send.bind(this));

        } else {
            throw new TypeError(`
                Expected a valid DOM node for the <form> element:
                incorrect identifier or missing <form> element.
            `);
        }
    }

    static method = 'POST';

    get xhrError() {
        /* eslint-disable no-undef */
        return `Error sending message: ${ request.response }
                Status: ${ request.statusText }`;
        /* eslint-enable no-undef */
    }

    addSpamService() {
        const head = document.querySelector('head');
        const dependency = document.createElement('script');
        const api = 'https://www.google.com/recaptcha/api.js?render=';
        dependency.setAttribute('async', '');
        dependency.setAttribute('src', `${ api }${ this.recaptcha }`);
        head.append(dependency);
    }

    runSpamFilter() {
        if (!this.recaptcha) return null;

        return new Promise(resolve => {
            /* eslint-disable no-undef */
            grecaptcha.ready(() => {
                grecaptcha.execute(this.recaptcha,
                /* eslint-enable no-undef */
                    {
                        action: this.id
                    })
                    .then(token => {
                        resolve(token);
                    });
            });
        });
    }

    validate() {
        if (this.requiredFields) {
            for (let field of this.requiredFields) {
                if (field.checkValidity() === false) {
                    return null;
                }
            }
        }
    }

    busy(response = {}) {
        if (isFunction(this.progress)) this.progress(response);
        // eslint-disable-next-line no-console
        else console.info('Sending the message...');
    }

    done(action, response = {}) {
        if (action === 'failure') {
            if (this.failure) {
                if (isFunction(this.failure)) return this.failure(response);
                else return window.location.replace(this.failure);
            }
            return console.error(response.description);
        }

        if (this.success) {
            if (isFunction(this.success)) return this.success(response);
            else return window.location.replace(this.success);
        }
        // eslint-disable-next-line no-console
        console.info('Success: message delivered.');
    }

    // transport for legacy agents
    xhr(formData) {
        const request = new XMLHttpRequest();
        request.open(Mailbox.method, this.destination);
        request.timeout = 5000;
        request.send(formData);
        request.onprogress = this.busy;
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) this.done('success', request);
            else console.error(this.xhrError);
        };
        request.onerror = () => console.error(this.xhrError);
    }

    // default transport
    fetch(formData) {
        const response = fetch(this.destination, {
            body: formData,
            method: Mailbox.method,
        });

        this.busy(response);

        response.then(data => {
            if (!data.ok) throw new Error(`HTTP error: ${ response.status }`);
            return data.json();
        })
            .then(obj => {
                if (obj.responseCode === 0) this.done('success', obj);
                else this.done('failure', obj);
            });
    }

    send(event) {
        event.preventDefault();

        this.validate();

        this.runSpamFilter()
            .then((token) => {
                const formData = new FormData(this.form);
                formData.append('token', token);
                formData.append('id', this.id);
                return formData;
            })
            .then(formData => {
                if (this.carrier === 'xhr') this.xhr(formData);
                else this.fetch(formData);
            }).catch(error => console.error('Error:', error));
    }
}
