/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  MATH  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Collection of mathematical routines.                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

// Smoothstep interpolation for transitions
function smoothstep(timeStart, timeEnd, now) {
    if (now <= timeStart) { return 0; }
    if (now >= timeEnd) { return 1; }
    const x = (now - timeStart) / (timeEnd - timeStart);
    return x * x * (3 - 2 * x);
}

export {
    smoothstep,
};
