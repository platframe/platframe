import { src, lastRun, dest } from 'gulp';
import merge from 'merge2';
import imagemin from 'gulp-imagemin';
import { plugins as _plugins } from './img-sprite';
import { src as source, ctx } from '..';

/* Images to be inlined (in "_inline" dirs) are handled by the tasks
 * responsible for the target medium in question; refer to styles.js
 * and templates.js respectively. */

const plugins = [
    imagemin.gifsicle(),
    imagemin.mozjpeg(),
    imagemin.optipng(),
    imagemin.svgo({ _plugins })
];

function imgLink() {

    return merge(

        // stream: optimize
        src([
            `${ source.images }/**/_link/**/*.{svg,png,gif,jpg,jpeg,webp}`,
            `${ source.components }/**/images/_link/*.{svg,png,gif,jpg,jpeg,webp}`,
        ], {
            // exclude unchanged files on subsequent 'watch' runs
            since: lastRun(imgLink)
        })
            .pipe(imagemin(plugins, { verbose: true }))
            .pipe(dest(ctx.path.images)),

        // stream: verbatim
        src([
            `${ source.images }/**/_link/**/verbatim/**/*.{png,gif,jpg,jpeg,webp}`,
            `${ source.components }/**/images/_link/verbatim/**/*.{png,gif,jpg,jpeg,webp}`,
        ], {
            since: lastRun(imgLink)
        })
            .pipe(dest(ctx.path.images))

    );

}

export default imgLink;
