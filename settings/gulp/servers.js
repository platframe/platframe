import { create } from 'browser-sync';
import c from 'ansi-colors';
import { app, ctx } from '..';

const server = create();
const production = ctx.id === 'production';

const log = `\u{00A0}${ c.white('Watching source, waiting to synchronize...') }\n
\u{00A0} ${ c.gray('project:') } ${ c.yellow.dim(app.name.charAt(0).toUpperCase().concat(app.name.slice(1))) }
\u{00A0} ${ c.gray('version:') } ${ c.green.dim(`v${ app.version }`) }
\u{00A0} ${ c.gray('context:') } ${ c.red.dim(`${ ctx.id }`) }
\u{00A0} ${ c.gray('network:') }
\u{00A0}\u{00A0}\u{00A0}\u{00A0}\u{00A0} ${ c.gray('app:') } ${ c.blue.dim(`${ ctx.server.app.host }:${ ctx.server.app.port }`) }
\u{00A0}\u{00A0}\u{00A0}\u{00A0}\u{00A0} ${ c.gray('api:') } ${ c.blue.dim(`${ ctx.server.api.host }:${ ctx.server.api.port }`) }
\u{00A0}\u{00A0}\u{00A0}\u{00A0}\u{00A0} ${ c.gray('db :') } ${ c.blue.dim(`${ ctx.server.db.host }:${ ctx.server.db.port }`) }\u{00A0}\n\n`;

const options = {
    logPrefix: production ? '' : log,
    port: ctx.server.app.port,
    // DNS lookup and external address
    online: true,
    // make server publicly accessable
    // tunnel opens during 'preflight'
    tunnel: production ? true : false,
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
    ui: {
        port: 3005,
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
