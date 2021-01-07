/**
 * Navigation module for gallery-1.
 * @module navigation
 * @see module:index
 */

export default (galleries) => {

    // attach event
    galleries.forEach(gallery => {
        // preflight
        verify(gallery);
        // activate presentation layer
        gallery.dataset.nav = 'true';
        // attach click event listener
        gallery.addEventListener('click', changeSlide.bind(null, gallery));
    });

};

// shared constants
const
    gallery = '.gallery-1',
    button  = '.gallery-1__modal-nav',
    buttonPrev   = `${ button }-left`,
    buttonNext   = `${ button }-right`,
    buttonPause  = `${ button }-pause`,
    galleryItem  = `${ gallery }__item`;

function processURL(gallerySeriesID, nextItemID) {

    // remove existing anchor fragment from page URL
    const baseURL = document.URL.replace(/#.*$/, '');
    // construct and activate new URL
    window.location.href = `${ baseURL }#${ gallerySeriesID }-${ nextItemID }`;

}

function showNext(currentItemID, numberOfItems, gallerySeriesID) {

    let nextItemID = ++currentItemID % numberOfItems;
    // Since we're dealing with a 1-based ID system, we're
    // compensating for the last two images in the gallery.
    if (nextItemID === 0) nextItemID = numberOfItems;
    // We've reached the last image, thus modulo will equal
    // total + 1, therefore we 'force' reset to first image.
    if (nextItemID === numberOfItems + 1) nextItemID = 1;
    // actuate image change
    processURL(gallerySeriesID, nextItemID);

}

function showPrev(currentItemID, numberOfItems, gallerySeriesID) {

    let nextItemID = --currentItemID % numberOfItems;
    // compensate to loop back to the last image in gallery
    if (nextItemID === 0) nextItemID = numberOfItems;
    // actuate image change
    processURL(gallerySeriesID, nextItemID);

}

function changeSlide(gallery, event) {

    // exit early if the click was not in target's scope; pausing is handled by autoplay
    if (!event.target.closest(button) || event.target.closest(buttonPause)) return null;

    // get the gallery's series identifier
    const gallerySeriesID = gallery.dataset.series;
    // corral all the images in the gallery container & store total count
    const numberOfItems = gallery.querySelectorAll(galleryItem).length;
    // store a reference to the specific button that was clicked
    const navButtonClicked =
        event.target.closest(buttonPrev) ? event.target.closest(buttonPrev) : event.target.closest(buttonNext);
    // get a reference to the currently shown image
    const currentItem = navButtonClicked.closest(galleryItem);
    // get the identifier of the currently shown image
    const currentItemID = parseInt(currentItem.dataset.id, 10);

    // show the previous image
    if (navButtonClicked.matches(buttonPrev)) {
        return showPrev(currentItemID, numberOfItems, gallerySeriesID);
    }
    // otherwise show the next image
    showNext(currentItemID, numberOfItems, gallerySeriesID);

}

// simple preflight verification
const verify = gallery => (gallery.querySelectorAll(galleryItem).length < 2) &&
    console.warn('Navigation controls for Gallery-1 requires at least 2 images per gallery.');
