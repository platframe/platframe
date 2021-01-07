/**
 * Autoplay module for gallery-1.
 * @module autoplay
 * @see module:index
 */

export default (galleries, delay) => {

    // attach event
    galleries.forEach(gallery => {
        // preflight
        verify(gallery);
        // activate presentation layer
        gallery.dataset.autoplay = 'true';
        // attach click event listener
        gallery.addEventListener('click', autoplay.bind(null, gallery, delay));
    });

};

// shared variables
let intervalID,
    thumbClicked,
    currentItem,
    currentItemID,
    gallerySeriesID,
    navButtonClicked,
    paused = false;

// shared constants
const
    gallery = '.gallery-1',
    button  = '.gallery-1__modal-nav',
    buttonPrev   = `${ button }-left`,
    buttonNext   = `${ button }-right`,
    buttonPause  = `${ button }-pause`,
    buttonClose  = `${ gallery }__modal-close`,
    galleryItem  = `${ gallery }__item`,
    galleryThumb = `${ gallery }__thumb`;

function processURL(nextItemID) {

    // remove existing anchor fragment from page URL
    const baseURL = document.URL.replace(/#.*$/, '');
    // construct and activate new URL
    window.location.href = `${ baseURL }#${ gallerySeriesID }-${ nextItemID }`;

}

function showNext(numberOfItems) {

    let nextItemID = ++currentItemID % numberOfItems;
    // Since we're dealing with a 1-based ID system, we're
    // compensating for the last two images in the gallery.
    if (nextItemID === 0) nextItemID = numberOfItems;
    // We've reached the last image, thus modulo will equal
    // total + 1, therefore we 'force' reset to first image.
    if (nextItemID === numberOfItems + 1) nextItemID = 1;
    // actuate image change
    processURL(nextItemID);

}

function identifyButton(event) {

    // determine which navigation control button was clicked
    switch (event.target.closest(button)) {

    case event.target.closest(buttonPrev):
        navButtonClicked = event.target.closest(buttonPrev);
        break;

    case event.target.closest(buttonNext):
        navButtonClicked = event.target.closest(buttonNext);
        break;

    default:
        navButtonClicked = event.target.closest(buttonPause);
    }
}

function handlePause(numberOfItems, delay, event) {

    if (!paused) {
        clearInterval(intervalID);
        event.currentTarget.dataset.paused = 'true';
        paused = true;
    } else {
        loop(numberOfItems, delay);
        event.currentTarget.dataset.paused = 'false';
        paused = false;
    }

}

function iterateImages(numberOfItems) {

    // reset the counter once we've reached the end
    if (currentItemID === numberOfItems + 1) currentItemID = 1;
    // show the next image
    showNext(numberOfItems);

}

const loop = (numberOfItems, delay) => intervalID =
    setInterval(iterateImages.bind(null, numberOfItems), delay);

function autoplay(gallery, delay, event) {

    // get the gallery's series identifier
    gallerySeriesID = gallery.dataset.series;
    // corral all the images in the gallery container & store total count
    const numberOfItems = gallery.querySelectorAll(galleryItem).length;

    //
    if (event.target.closest(galleryThumb)) {
        // store a reference to the specific thumb (anchor) that was clicked
        thumbClicked = event.target.closest(galleryThumb);
        // Get a reference to the thumbnail's parent container (the "gallery item")
        // containing the relevant attributes required to bootstrap all the functionality.
        currentItem = thumbClicked.closest(galleryItem);
        // get the identifier of the currently shown image
        currentItemID = parseInt(currentItem.dataset.id, 10);
        // begin the initial autoplay
        loop(numberOfItems, delay);
    }

    // handle "backward" and "pause" interactions
    if (event.target.closest(button)) {

        identifyButton(event);

        // get a reference to the currently shown image
        currentItem = navButtonClicked.closest(galleryItem);
        // get the gallery's series identifier
        currentItemID = parseInt(currentItem.dataset.id, 10);
        // If the user navigated backward, reduce the image ID by 1
        // to ensure that autoplay will resume from the correct position.
        if (navButtonClicked.matches(buttonPrev)) currentItemID--;
        // handle navigation while autoplay is active
        if (!paused &&
            (navButtonClicked.matches(buttonNext) || navButtonClicked.matches(buttonPrev))
        ) {
            clearInterval(intervalID);
            loop(numberOfItems, delay);
        }
        // if the "pause" button was clicked
        if (navButtonClicked.matches(buttonPause)) handlePause(numberOfItems, delay, event);
    }

    // stop the autoplayer when the modal is closed
    if (event.target.matches(buttonClose)) {
        // reset pause button to default state
        paused = false;
        gallery.dataset.paused = 'false';
        // stop autoplay
        clearInterval(intervalID);
    }

}

// simple preflight verification
const verify = gallery => (gallery.querySelectorAll(galleryItem).length < 2) &&
    console.warn('Autoplay for Gallery-1 requires at least 2 images per gallery.');
