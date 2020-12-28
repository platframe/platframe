import { watch, series } from 'gulp';
import log from 'fancy-log';
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
    ],
        series(
            async () => log('\u{1F4C4}\u{00A0} Rebuilding templates...'),
            templates,
            reload
        )
    );

    //// styles & images: inline
    watch([
        `${ src.styles }/**/*.styl`,
        `${ src.components }/**/*.styl`,
        `${ src.images }/**/_inline/**/*`,
    ],
        series(
            async () => log('\u{1F3A8}\u{00A0} Rebuilding styles...'),
            styles,
            reload
        )
    );

    //// logic
    watch([
        `${ src.logic }/**/*.js`,
        `${ src.components }/**/*.js`,
    ],
        series(
            async () => log('\u{1F4BE}\u{00A0} Rebuilding logic...'),
            logic,
            reload
        )
    );

    //// images: linked
    watch(`${ src.images }/**/_linked/**/*`, { events: 'change' },
        series(
            async () => log('\u{1F5BC}\u{FE0F}\u{00A0} Rebuilding linked images...'),
            imgExisting,
            reload
        )
    );

    watch(`${ src.images }/**/_linked/**/*`, { events: 'add' },
        series(
            async () => log('\u{1F5BC}\u{FE0F}\u{00A0} Adding linked images...'),
            imgAdded,
            reload
        )
    );

    //// images: sprites
    watch([
        `${ src.root }/**/_views/*.svg`,
        `${ src.root }/**/_symbols/*.svg`,
    ],
        series(
            async () => log('\u{1F58C}\u{FE0F}\u{00A0} Rebuilding SVG sprite sheets...'),
            imgSprite,
            reload
        )
    );

    //// fonts
    watch(`${ src.fonts }/**/*.{ttf,svg,woff*}`,
        series(
            async () => log('\u{1F524}\u{00A0} Rebuilding fonts...'),
            collect,
            reload
        )
    );

}

export default watcher;
