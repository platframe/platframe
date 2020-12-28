const // cache environment context
    { env } = process,
    ENV = env.NODE_ENV || 'production',

    // input
    SRC = 'src',
    // dest: dev
    DEV = 'dev',
    // dest: prd
    PRD = 'prd',
    // dest: env
    OUT = ENV === 'development' ? DEV : PRD,

    // config: meta
    app = {
        name   : env.npm_package_name,
        // ISO 8601 at zero UTC offset
        date   : (new Date).toISOString(),
        // seconds elapsed since UNIX epoch
        time   : Math.floor(Date.now() / 1000),
        author : env.npm_package_author_name,
        version: env.npm_package_version,
    },

    // config: source
    src = {
        root:       `${ SRC }`,
        fonts:      `${ SRC }/fonts`,
        logic:      `${ SRC }/logic`,
        styles:     `${ SRC }/styles`,
        images:     `${ SRC }/images`,
        templates:  `${ SRC }/templates`,
        components: `${ SRC }/components`,
    },
    // config: development
    development = {
        id: 'development',
        app: {
            host: env.PLATFRAME_APP_HOST || '0.0.0.0',
            port: env.PLATFRAME_APP_PORT || 3000,
        },
        db: {
            host: env.PLATFRAME_DB_HOST || '0.0.0.0',
            port: env.PLATFRAME_DB_PORT || 27017,
            name: env.PLATFRAME_DB_NAME || 'test',
        },
        path: {
            root:   `${ OUT }`,
            fonts:  `${ OUT }/assets/fonts`,
            logic:  `${ OUT }/assets/logic`,
            styles: `${ OUT }/assets/styles`,
            images: `${ OUT }/assets/images`,
        }
    },
    // config: production
    production = {
        id: 'production',
        app: {
            host: env.PLATFRAME_APP_HOST || '0.0.0.0',
            port: env.PLATFRAME_APP_PORT || 3000,
        },
        db: {
            host: env.PLATFRAME_DB_HOST || '0.0.0.0',
            port: env.PLATFRAME_DB_PORT || 27017,
            name: env.PLATFRAME_DB_NAME || '',
        },
        path: {
            root:   `${ OUT }/`,
            fonts:  `${ OUT }/assets/fonts`,
            logic:  `${ OUT }/assets/logic`,
            styles: `${ OUT }/assets/styles`,
            images: `${ OUT }/assets/images`,
        }
    };

// assign active context
const ctx = ENV === 'production' ? production : development;

module.exports = {
    app,
    src,
    ctx,
};
