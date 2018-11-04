import { scroll } from 'libs/int/animation';

export default function() {

    if (document.querySelector('#home .nav-1')) {

        var context = document.documentElement,
            triggers = document.querySelectorAll('[data-go]'),
            duration = 500;

        for (let trigger of triggers) {

            // determine the intended destination
            let destination = trigger.attributes['data-go'].value === 'next'
                ? trigger.parentNode.nextElementSibling
                : context;

            trigger.addEventListener('click', function(event) {

                // attempt to use native implementation first
                if ('scrollBehavior' in document.documentElement.style) {

                    destination.scrollIntoView({ behavior: 'smooth' });

                } else {

                    scroll(destination.offsetTop, duration);

                }
                event.stopPropagation;
            });
        }

    }

}
