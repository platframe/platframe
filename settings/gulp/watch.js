import { watch, series } from 'gulp';
import templates from './templates';
import styles from './styles';
import logic from './logic';
import imgSprite from './img-sprite';
import collect from './collect';
import { reload } from './servers';
import imgExisting, { imgAdded } from './img-linked';
import { src } from '..';

function watcher() {

    //// templates & images: inline
    watch([
        `${ src.templates }/**/*.pug`,
        `${ src.components }/**/*.pug`,
        `${ src.images }/**/_inline/**/*`,
    ], series(templates, reload));

    //// styles & images: inline
    watch([
        `${ src.styles }/**/*.styl`,
        `${ src.components }/**/*.styl`,
        `${ src.images }/**/_inline/**/*`,
    ], series(styles, reload));

    //// logic
    watch([
        `${ src.logic }/**/*.js`,
        `${ src.components }/**/*.js`,
    ], series(logic, reload));

    //// images: linked
    watch([ // existing modified images
        `${ src.images }/**/_linked/**/*`,
    ], { events: 'change' }, series(imgExisting, reload));

    watch([ // new images
        `${ src.images }/**/_linked/**/*`,
    ], { events: 'add' }, series(imgAdded, reload));

    //// images: sprites
    watch([
        `${ src.root }/**/_views/*.svg`,
        `${ src.root }/**/_symbols/*.svg`,
    ], series(imgSprite, reload));

    //// fonts
    watch(`${ src.fonts }/**/*.{ttf,svg,woff*}`,
        series(collect, reload));

}

export default watcher;
