import { scroll } from 'libs/internal/animation';

export default function() {

    // preflight checks
    if (!document.querySelector('.nav-1')) return;

    try {

        if (!document.querySelector('.nav-1[data-target]')) {
            throw new Error('Platframe: "nav-1" requires its "data-target" attribute to be set.');
        }

    } catch (error) {
        console.error(error.message);
        return;
    }

    // begin procedure
    const triggers = document.querySelectorAll('.nav-1'),
        duration = 500;

    for (let trigger of triggers) {

        let target = document.querySelector(`#${ trigger.attributes['data-target'].value }`);

        trigger.addEventListener('click', function(event) {

            // prefer native implementation
            if ('scrollBehavior' in document.documentElement.style) {

                target.scrollIntoView({ behavior: 'smooth' });

            } else {

                scroll(target.offsetTop, duration);

            }
            event.stopPropagation;
        });
    }

}
