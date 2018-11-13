import { watch, series } from 'gulp';
import templates from './templates';
import styles from './styles';
import logic from './logic';
import collect from './collect';
import { reload } from './servers';
import { src } from '..';

function watcher() {

    watch([
        `${ src.templates }/**/*.pug`,
        `${ src.components }/**/*.pug`,
        `${ src.images }/**/_inline/**/*`,
    ], series(templates, reload));

    watch([
        `${ src.styles }/**/*.styl`,
        `${ src.components }/**/*.styl`,
        `${ src.images }/**/_inline/**/*`,
    ], series(styles, reload));

    watch([
        `${ src.logic }/js/**/*.js`,
        `${ src.components }/**/*.js`,
    ], series(logic, reload));

    watch(`${ src.fonts }/**/*.{ttf,svg,woff*}`,
        series(collect, reload));

}

export default watcher;