const // cache environment context
    ENV = process.env.NODE_ENV || 'development',

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
        name   : process.env.npm_package_name,
        // ISO 8601 at zero UTC offset
        date   : (new Date).toISOString(),
        // seconds elapsed since UNIX epoch
        time   : Math.floor(Date.now() / 1000),
        port   : process.env.npm_package_config_port,
        author : process.env.npm_package_author_name,
        version: process.env.npm_package_version,
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
            host: '0.0.0.0',
            port: 3000,
        },
        db: {
            host: '0.0.0.0',
            port: 27017,
            name: 'test',
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
            host: '0.0.0.0',
            port: 3000,
        },
        db: {
            host: '0.0.0.0',
            port: 27017,
            name: '',
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
