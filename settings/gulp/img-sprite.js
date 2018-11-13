import path from 'path';
import { src, dest } from 'gulp';
import merge from 'merge2';
import spriter from 'gulp-svg-sprite';
import { src as source, ctx } from '..';

function filename(name) {
    return path.basename(name, '.svg');
}

/*━━━━━━━━━━━━━━━━━━━━━━━━━  MINIFY OPTIONS  ━━━━━━━━━━━━━━━━━━━━━━━━━
 *    SVGO and its defaults · github.com/svg/svgo#what-it-can-do    */

export const plugins = [
    { removeViewBox:         false },
    { removeTitle:           false },
    { removeDesc:            false },
    { mergePaths:            false },
    { convertStyleToAttrs:   false },
    { moveGroupAttrsToElems: false }, // move some group attributes to the content elements
    { convertShapeToPath:    false }, // convert some basic shapes to path
    { removeDimensions:      false }, // remove WxH (required for IE 9 & 10, progressive enhancement)
    { transformsWithOnePath: false }, // apply transforms, crop by real width, center vertical alignment and resize SVG with one path inside
];

/*━━━━━━━━━━━━━━━━━━━━━━━━━  SPRITE OPTIONS  ━━━━━━━━━━━━━━━━━━━━━━━*/

const view = {                        // "view" sprite config
    dest: '',                         // disable "mode" directory prefix
    sprite: 'views.svg',              // sprite path and filename
    bust: false,                      // cache busting switch
    layout: 'packed'                  // graphics arrangement
};

const symbol = {                      // "symbol" sprite config
    dest: '',                         // disable "mode" directory prefix
    sprite: 'symbols.svg',            // sprite path and filename
    bust: false,                      // cache busting switch
};

/*━━━━━━━━━━━━━━━━━━━━━━━━━  SHAPE OPTIONS  ━━━━━━━━━━━━━━━━━━━━━━━━*/

const shape = {
    id: {
        generator: filename
    },
    dimension: {                      // normalize dimensions
        maxWidth: 100,
        maxHeight: 100,
        precision: 2,
    },
    spacing: {
        padding: 0,                   // prevent adjacent edges showing
        box: 'content',               // box-sizing strategy
    },
    transform: [{
        svgo: {
            plugins
        }}
    ],
};

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TASK  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

function imgSprite() {

    return merge(

        // stream: views
        src(`${ source.root }/**/_views/*.svg`)
            .pipe(spriter({
                shape,
                mode: { view },
            }))
            .pipe(dest(`${ ctx.path.images }/_sprites`)),

        // stream: symbols
        src(`${ source.root }/**/_symbols/*.svg`)
            .pipe(spriter({
                shape,
                mode: { symbol },
            }))
            .pipe(dest(`${ ctx.path.images }/_sprites`)),

    );

}

export default imgSprite;