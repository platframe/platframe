import { src, dest } from 'gulp';
import gulpif from 'gulp-if';
import stylus from 'gulp-stylus';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import { plugins } from './img-sprite';
import { app, src as source, ctx } from '..';

const production = ctx.id === 'production';

const pkg = {
    ENV: ctx.id,
    NAME: app.name,
    VERSION: app.version,
    AUTHOR: app.author,
    DATE: app.date,
};

const inline = [
    {
        url: 'inline',
        // keep consistent with markup
        // inlining; relative to "src"
        basePath: '../',
        encodeType: 'base64',
        filter: '**/_inline/**/*.{png,gif,jpg,jpeg,webp}',
    }, {
        url: 'inline',
        basePath: '../',
        optimizeSvgEncode: true,
        encodeType: 'encodeURIComponent',
        filter: '**/_inline/**/*.svg',
    },
];

const dev = {
    stylus: {
        define: pkg,
        linenos: false,
    },
    postcss: [
        require('autoprefixer')({
            // uses .browserslistrc
            cascade: true
        }),
        require('postcss-url')(
            // inlining requires asset paths to be relative
            inline
        ),
    ],
};

const prd = {
    stylus: {
        define: pkg,
    },
    postcss: [
        require('autoprefixer'),
        require('css-mqpacker')({ sort: true }),
        require('postcss-url')(inline),
        require('postcss-svgo')({ plugins }),
        require('cssnano')
    ],
};

const options = production ? prd : dev;

function styles() {

    return src(`${ source.styles }/root.styl`)

        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(stylus(options.stylus))
        .pipe(postcss(options.postcss))
        .pipe(gulpif(!production, sourcemaps.write('.')))
        .pipe(dest(ctx.path.styles));

}

export default styles;
