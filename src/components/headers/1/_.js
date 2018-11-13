export default function() {

    // prerun checks
    if (!document.querySelector('.header-1')) return;

    // store common references
    let opacity,
        platformSmall = 'small',
        platformLarge = 'large',
        compactMenuScrollTrigger = 235,
        compactMenuResizeTrigger = 1000,
        classCompactMenu = 'compact-menu',
        header = document.querySelector('.header-1'),
        menu = header.querySelector('#navigation ul'),
        scheduled = false;

    // add a platform state flag when in large viewports (desktop)
    if (window.innerWidth >= compactMenuResizeTrigger) {
        header.setAttribute('data-platform', platformLarge);
    }

    // utility: fade in
    function fadeIn(currentState) {
        // check to see if we should remove the compact menu styles and display the original menu
        if (currentState === 'expanded') header.classList.remove(classCompactMenu);
        menu.style.display = 'block';
        opacity = 0;
        !function fade() {
            if ((opacity += .1) <= 1) {
                opacity = parseFloat(opacity.toFixed(2));
                menu.style.opacity = opacity;
                requestAnimationFrame(fade);
            // clean up animation artifacts:
            // causes unwanted initial opened state of compact menu when resizing to mobile
            } else if (currentState === 'expanded') {
                menu.attributes.removeNamedItem('style');
            }
        }();
    }

    // utility: fade out
    function fadeOut(currentState) {
        opacity = 1;
        !function fade() {
            if ((opacity -= .1) < 0) {
                menu.style.display = 'none';
                // we're transitioning state, add a class to display the compact version of the menu
                if (currentState === 'expanded') header.classList.add(classCompactMenu);
            } else {
                opacity = parseFloat(opacity.toFixed(2));
                menu.style.opacity = opacity;
                requestAnimationFrame(fade);
            }
        }();
    }

    // handle toggling of the compact menu on scroll
    window.addEventListener('scroll', function() {

        // trivial debouncing
        if (!scheduled) {

            scheduled = true;

            setTimeout(function() {

                scheduled = false;

                // fade out expanded menu style
                if (window.scrollY >= compactMenuScrollTrigger) {
                    // prevent unnecessary execution
                    if (!header.classList.contains(classCompactMenu)) {
                        fadeOut('expanded');
                    }
                // if not past the trigger area & not on a compact platform, revert to the original menu
                } else if (header.classList.contains(classCompactMenu) && (window.innerWidth > 1000)) {
                    fadeIn('expanded');
                }

            }, 250);

        }

    });

    // handle toggling of menu on viewport resize
    window.addEventListener('resize', function() {

        let initialWidth = window.innerWidth;

        // trivial debouncing
        if (!scheduled) {

            scheduled = true;

            setTimeout(function() {

                scheduled = false;

                // change the platform state flag when resizing into mobile
                if ((initialWidth <= compactMenuResizeTrigger) &&
                    (header.getAttribute('data-platform') === platformLarge)) {
                    header.setAttribute('data-platform', platformSmall);
                } else if (

                    // if we come from a mobile state, and our viewport width is greater than the
                    // maximum for mobile, and we have not yet scrolled beyond the trigger point for
                    // activating the compact menu on desktop
                    header.getAttribute('data-platform') === platformSmall &&
                    initialWidth >= compactMenuResizeTrigger &&
                    window.scrollY <= compactMenuScrollTrigger) {

                    // show expanded menu
                    fadeIn('expanded');
                    // reset state
                    header.setAttribute('data-platform', platformLarge);

                } else if (
                    // we are scrolled beyond the trigger point for the compact menu, and have
                    // resized back into desktop width; reset state but do not restore expanded menu
                    (header.getAttribute('data-platform') === platformSmall) &&
                    (initialWidth >= compactMenuResizeTrigger)) {
                    header.setAttribute('data-platform', platformLarge);
                }

            }, 250);

        }

    });

    // handle triggering of the compact menu via its button
    document.documentElement.addEventListener('click', (event) => {
        if (event.target.matches('#navigation button') || event.target.matches('#navigation button *')) {
            (menu.style.display === 'block') ? fadeOut() : fadeIn();
        } else if (header.classList.contains(classCompactMenu) && menu.style.display === 'block') {
            fadeOut();
        }
    });
}
