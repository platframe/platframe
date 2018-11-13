import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import inline from 'gulp-inline-source';
import { app, src as source, ctx } from '..';

const locals = {
    ENV: ctx.id,
    VERSION: app.version,
    AUTHOR: app.author,
    DATE: app.date,
    TIME: app.time,
};

const development = {
    pug: {
        locals,
        pretty: true,
        verbose: false,
    },
    inline: {
        // root necessary for components
        rootpath: `${ source.root }/`,
        // uses csso, svgo or uglify-js
        compress: true,
    }
};

const production = {
    pug: {
        locals,
    },
    inline: {
        rootpath: `${ source.root }/`,
        compress: true,
    }
};

const options = ctx.id === 'production' ? production : development;

function templates() {

    return src([
        `${ source.templates }/views/**/!(_)*.pug`,
        `!${ source.templates }/views/**/_/**`,
    ])
        .pipe(pug(options.pug))
        .pipe(inline(options.inline))
        .pipe(dest(ctx.path.root));

}

export default templates;
