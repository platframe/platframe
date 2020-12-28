import { create } from 'browser-sync';
import { app, ctx } from '..';

const server = create();
const production = ctx.id === 'production';
const log = `\u{00A0}watching source... | ${ app.name } | ${ app.version } | env: ${ ctx.id }\u{00A0}`;

const options = {
    logPrefix: production ? '' : log,
    port: ctx.app.port,
    // DNS lookup and external address
    online: true,
    // make server publicly accessable
    // tunnel open in 'preflight' runs
    tunnel: production ? true : false,
    // handle concurrent file changes
    server: {
        index: 'index.html',
        baseDir: ctx.path.root,
    },
    open: false,
    notify: false,
    logLevel: 'info',
    logConnections: true,
    reloadOnRestart: true,
    reloadDelay: 1000,
    ghostMode: {
        forms: true,
        clicks: true,
        scroll: true
    },
};

export function host(done) {
    server.init(options);
    done();
}

export function reload(done) {
    server.reload();
    done();
}
