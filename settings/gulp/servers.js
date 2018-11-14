import { create } from 'browser-sync';
import c from 'ansi-colors';
import { app, ctx } from '..';

const server = create();
const production = ctx.id === 'production';

const log = `\u{00A0}${ c.white('Watching source, waiting to synchronize...') }
\u{00A0} ${ c.gray('project:') } ${ c.yellow.dim(app.name.charAt(0).toUpperCase().concat(app.name.slice(1))) }
\u{00A0} ${ c.gray('version:') } ${ c.green.dim(`v${ app.version }`) }
\u{00A0} ${ c.gray('context:') } ${ c.red.dim(`${ ctx.id }`) }\u{00A0}\n`;

const options = {
    logPrefix: production ? '' : log,
    port: app.port,
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
