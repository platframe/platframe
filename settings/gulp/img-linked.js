import { src, lastRun, dest } from 'gulp';
import merge from 'merge2';
import log from 'fancy-log';
import webp from 'gulp-webp';
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

const webpConfig = {
    preset: 'default',
    method: 5,
    quality: 90,
};

export default function imgLinked() {

    return merge(

        // stream: optimize
        src([
            `${ source.images }/**/_linked/**/*.{svg,png,gif,jpg,jpeg}`,
            `${ source.components }/**/images/_linked/**/*.{svg,png,gif,jpg,jpeg}`,
            // exclusions
            `!${ source.images }/**/_linked/**/_verbatim/**/*.{svg,png,gif,jpg,jpeg}`,
            `!${ source.components }/**/images/_linked/**/_verbatim/**/*.{svg,png,gif,jpg,jpeg}`,
        ], {
            // exclude unchanged files on subsequent 'watch' runs
            since: lastRun(imgLinked)
        })
            .pipe(imagemin(plugins, { verbose: true }))
            .pipe(dest(ctx.path.images)),

        // stream: verbatim
        src([
            `${ source.images }/**/_linked/**/_verbatim/**/*.{png,gif,jpg,jpeg}`,
            `${ source.components }/**/images/_linked/_verbatim/**/*.{png,gif,jpg,jpeg}`,
        ], {
            since: lastRun(imgLinked)
        })
            .pipe(dest(ctx.path.images)),

        // stream: optimize: webp
        src([
            `${ source.images }/**/_linked/**/!(_verbatim)/**/*.webp`,
            `${ source.components }/**/images/_linked/*.webp`,
            // exclusions
            `!${ source.images }/**/_linked/**/_verbatim/**/*.webp`,
        ],
            { since: lastRun(imgLinked) })
            .pipe(webp(webpConfig))
            .on('end', () => log('Finished optimizing WebP images.'))
            .pipe(dest(ctx.path.images)),

        // stream: verbatim: webp
        src([
            `${ source.images }/**/_linked/**/_verbatim/**/*.webp`,
            `${ source.components }/**/images/_linked/_verbatim/**/*.webp`
        ],
            { since: lastRun(imgLinked) })
            .pipe(dest(ctx.path.images))
            .on('end', () => log(`Finished copying WebP images to the '${ ctx.path.root }' directory.`))

    );

}

export function imgAdded() {

    // imgAdded() is not an optimal solution; it's intended as a temporary workaround for
    // the 'watch' task handling 'linked' images that's newly created/added as they are not
    // accounted for by lastRun's current comparison approach, resulting in images added
    // during a build to never get piped through to its destination.
    // Refer: https://github.com/gulpjs/gulp/issues/2274

    return merge(

        // stream: optimize
        src([
            `${ source.images }/**/_linked/**/*.{svg,png,gif,jpg,jpeg}`,
            `${ source.components }/**/images/_linked/**/*.{svg,png,gif,jpg,jpeg}`,
            // exclusions
            `!${ source.images }/**/_linked/**/_verbatim/**/*.{svg,png,gif,jpg,jpeg}`,
            `!${ source.components }/**/images/_linked/**/_verbatim/**/*.{svg,png,gif,jpg,jpeg}`,
        ])
            .pipe(imagemin(plugins, { verbose: true }))
            .pipe(dest(ctx.path.images)),

        // stream: verbatim
        src([
            `${ source.images }/**/_linked/**/_verbatim/**/*.{png,gif,jpg,jpeg}`,
            `${ source.components }/**/images/_linked/_verbatim/**/*.{png,gif,jpg,jpeg}`,
        ])
            .pipe(dest(ctx.path.images)),

        // stream: optimize: webp
        src([
            `${ source.images }/**/_linked/**/*.webp`,
            `${ source.components }/**/images/_linked/*.webp`,
            // exclusions
            `!${ source.images }/**/_linked/**/_verbatim/**/*.webp`,
        ])
            .pipe(webp(webpConfig))
            .on('end', () => log('Finished optimizing newly added WebP images.'))
            .pipe(dest(ctx.path.images)),

        // stream: verbatim: webp
        src([
            `${ source.images }/**/_linked/**/_verbatim/**/*.webp`,
            `${ source.components }/**/images/_linked/_verbatim/**/*.webp`
        ])
            .pipe(dest(ctx.path.images))
            .on('end', () => log(`Finished copying newly added WebP images to the '${ ctx.path.root }' directory.`))

    );

}
