import { scroll } from '../libs/animation';

// set scroll behavior of in-page anchors to "smooth"
function smooth() {

    let inPageLinks = document.querySelectorAll('a[href*=\\#]'),
        duration = 500;

    for (let link of inPageLinks) {

        if (location.pathname === link.pathname // same page?
            && location.hostname === link.hostname // same domain?
            && link.hash.replace(/#/,'')) /* false positive? */ {

            let href = link.hash,
                destination = href.length
                    ? document.getElementById(`${ href.slice(1) }`)
                    : false;

            if (destination) {
                link.addEventListener('click', function() {

                    // prefer native implementation
                    if ('scrollBehavior' in document.documentElement.style) {

                        destination.scrollIntoView({ behavior: 'smooth' });

                    } else scroll(destination.offsetTop, duration);

                });
            }
        }
    }
}

export {
    smooth,
};
