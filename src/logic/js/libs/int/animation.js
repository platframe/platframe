/*━━━━━━━━━━━━━━━━━━━━━━━━━━━  ANIMATION  ━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Collection of effects typically used in animation.                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

import { smoothstep } from 'math';

// smooth scrolling effect
function scroll(destination, duration) {

    let currentPosition = window.pageYOffset,
        distanceToGo = destination - currentPosition,
        timeStart = Date.now(),
        timeEnd = timeStart + duration;

    // initiate scroller
    !function scroller() {
        // incrementally set the new vertical offset
        const now = Date.now(),
            // get the estimated next point on path
            nextPoint = smoothstep(timeStart, timeEnd, now),
            // calculate the eased distance increment
            newScrollTop = Math.round(currentPosition + (distanceToGo * nextPoint));
        // scroll along the y-axis
        window.scroll(0, newScrollTop);
        // check if we're done
        if (now >= timeEnd) return;
        // schedule next move
        requestAnimationFrame(scroller);
    }();
}

export {
    scroll,
};
