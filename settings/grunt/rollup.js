const // plugins
    babel   = require('rollup-plugin-babel'),        // transpile
    replace = require('rollup-plugin-replace'),      // replace strings while bundling
    include = require('rollup-plugin-includepaths'), // enable path-relative module resolution
    resolve = require('rollup-plugin-node-resolve'); // locate external CJS modules in node_modules

// context predicate
const production = process.env.NODE_ENV === 'production';

module.exports = {

    options: {
        format: 'iife',
        sourceMap: production ? false : 'inline',
        plugins: [
            resolve(),
            include({
                paths: ['src/components', 'src/logic/js'],
            }),
            replace({
                exclude: 'node_modules/**',
                values: {
                    ENV: `'${ process.env.NODE_ENV || 'development' }'`,
                    VERSION: '<%= package.version %>',
                }
            }),
            babel({
                exclude: 'node_modules/**',
            }),
        ]
    },
    files: {
        'src' : '<%= src_log %>js/root.js',
        'dest': '<%= dest %>/assets/logic/js/root.js',
    }

};
