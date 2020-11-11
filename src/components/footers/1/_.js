export default function() {

    const icons = document.querySelectorAll('.rollover');

    for (let icon of icons) {

        let use = icon.querySelector('use'),
            url = use.getAttribute('xlink:href');

        icon.addEventListener('mouseenter', (event) => {

            use.setAttribute('xlink:href', (url + '_'));
            event.stopPropagation();

        });

        icon.addEventListener('mouseleave', (event) => {

            use.setAttribute('xlink:href', (url));
            event.stopPropagation();

        });

    }
}
