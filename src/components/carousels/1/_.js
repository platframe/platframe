export default ({
    delay = 4000,
    slide: slideClass = 'image',
    active: activeClass = 'active',
    container = 'carousel-1',
} = {}) => {

    // first check if the specified container is in document
    if (!document.querySelector(`.${ container }`)) return null;

    let activeImage;

    // retrieve the DOM element of the container selector
    container = document.querySelector(`.${ container }`);

    // corral all the slides that's in the slideshow container
    const slides = container.querySelectorAll(`.${ slideClass }`);
    const numberOfSlides = slides.length;

    if (container.querySelector(`.${ activeClass }`)) {
        // if "active" modifier were used, use that as first image
        activeImage = container.querySelector(`.${ slideClass }`);
    } else {
        // otherwise, just use the first image in the series
        container.querySelector('img').classList.add(activeClass);
        activeImage = container.querySelector(`.${ slideClass }`);
    }

    // locate the index of the slide earmarked for initial display
    let indexOfActiveSlide = [].indexOf.call(slides, activeImage);

    // the slide rotator
    const rotate = () => {
        slides[indexOfActiveSlide].classList.remove(activeClass);
        // modulo shifts to next slide in queue and restarts at end
        indexOfActiveSlide = ++indexOfActiveSlide % numberOfSlides;
        slides[indexOfActiveSlide].classList.add(activeClass);
    };

    // begin rotation
    setInterval(rotate, delay);

};
