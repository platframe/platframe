/**
 * Logic for the gallery-1 component.
 * @module index
 * @see module:navigation
 */

import autoplay from './autoplay';
import navigation from './navigation';

export default ({
    delay = 3500,
    autoplay: auto = false,
    navigation: nav = false,
    gallerySelector: galleries = 'gallery-1',
} = {}) => {

    // ensure proper encoding for use as a CSS expression
    galleries = `.${ CSS.escape(galleries) }`;

    // exit early if the specified container is not present
    if (!document.querySelector(galleries)) return null;

    // store the DOM object of the container selector
    galleries = document.querySelectorAll(galleries);

    // activate navigation controls
    if (nav) navigation(galleries);

    // activate slideshow autoplay
    if (auto) autoplay(galleries, delay);

    // common functionality
    galleries.forEach(gallery => {

        gallery.addEventListener('click', event => {
            // prevent "page jump" and maintain vertical position on modal close
            if (event.target.matches('.gallery-1__modal-close')) {
                window.location.hash = '$';
                event.preventDefault();
            }

        });

    });

};
