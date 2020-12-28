import { src, dest, lastRun } from 'gulp';
import { src as source, ctx } from '..';

function development() {

    return src(`${ source.fonts }/**/*.{ttf,svg,woff*}`, {
        since: lastRun(collect)
    })
        .pipe(dest(ctx.path.fonts));

}

function production(done) {

    done();

}

const collect = ctx.id === 'production' ? production : development;

export default collect;
