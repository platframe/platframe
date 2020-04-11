/* GULP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

import { series, parallel } from 'gulp';

/* TASKS ━━━━━━━━━━━━━━ private  ━━━━━━━━━━━━━━ */

import watch from './settings/gulp/watch';
import clean from './settings/gulp/clean';
import logic from './settings/gulp/logic';
import notify from './settings/gulp/notify';
import styles from './settings/gulp/styles';
import collect from './settings/gulp/collect';
import imgLink from './settings/gulp/img-link';
import templates from './settings/gulp/templates';
import imgSprite from './settings/gulp/img-sprite';
import { host } from './settings/gulp/servers';

/* TASKS ━━━━━━━━━━━━━━━ public  ━━━━━━━━━━━━━━ */

export const develop = series(
    clean,
    collect,

    parallel(
        templates,
        styles,
        imgLink,
        imgSprite,
        logic,

    ), host, notify, watch
);

export const build = series(
    clean,
    collect,

    parallel(
        templates,
        styles,
        imgLink,
        imgSprite,
        logic,

    ), notify
);

export const preflight = series(
    clean,
    collect,

    parallel(
        templates,
        styles,
        imgLink,
        imgSprite,
        logic,

    ), host, notify

);

export const serve = preflight;

export const deploy = series(
    build,
);

// default task
export default develop;
