/*━━━━━━━━━━━━━━━━━━━━━━━━━━━  ANIMATION  ━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Collection of effects typically used in animation.                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

import { smoothstep } from 'math';

// smooth scrolling effect
function scroll(destination, duration) {

    let currentPosition = document.documentElement.scrollTop,
        distanceToGo = destination - currentPosition,
        timeStart = Date.now(),
        timeEnd = timeStart + duration;

    // initiate scroller
    !function scroller() {
        // incrementally set the new scrollTop
        const now = Date.now(),
            // get the estimated next point on path
            nextPoint = smoothstep(timeStart, timeEnd, now),
            // calculate new scrollTop value
            newScrollTop = Math.round(currentPosition + (distanceToGo * nextPoint));
        document.documentElement.scrollTop = newScrollTop;
        // check if we're done
        if (now >= timeEnd) return;
        // schedule next move
        requestAnimationFrame(scroller);
    }();
}

export {
    scroll,
};
