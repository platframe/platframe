// functions
function namer(name) {
    return path.basename(name, '.svg');
}

// assignments
var path = require('path'),

    // modify SVGO and its enabled defaults
    // see https://github.com/svg/svgo#what-it-can-do
    svgoPlugins = [
        { removeViewBox:              false }, // remove viewBox attribute
        { removeTitle:                false }, // remove <title>
        { mergePaths:                 false }, // merge multiple paths into one
        { convertStyleToAttrs:        false }, // convert styles into attributes
        { moveGroupAttrsToElems:      false }, // move some group attributes to the content elements
        { convertShapeToPath:		  false }, // convert some basic shapes to path
        { removeDimensions:           false }, // remove WxH (required for IE 9 & 10, progressive enhancement)
        { transformsWithOnePath:      false }  // apply transforms, crop by real width, center vertical alignment and resize SVG with one path inside
    ],

    // minification config (bypass sprite creation)
    config_optimize = {
        shape: {
            dest: '.',
            transform: [{
                svgo: {                        // transformations / optimizations
                    plugins: svgoPlugins
                }}
            ]
        }
    },

    // "view" config
    config_view = {
        shape: {
            id: {
                generator: namer
            },
            transform: [{
                svgo: {
                    plugins: svgoPlugins
                }}
            ]
        },
        mode: {
            view: {
                dest: '',                     // disable "mode" directory prefix
                sprite: 'views.svg',          // sprite path and filename
                bust: false,                  // cache busting switch
                layout: 'packed'              // graphics arrangement
            }
        }
    },

    // "symbol" config
    config_symbol = {
        shape: {
            id: {
                generator: namer
            },
            transform: [{
                svgo: {                        // transformations / optimizations
                    plugins: svgoPlugins
                }}
            ]
        },
        mode: {
            symbol: {
                dest: '',                      // disable "mode" directory prefix
                sprite: 'symbols.svg',         // sprite path and filename
                bust: false                    // cache busting switch
            }
        }
    };

module.exports = {

    // global configuration
    options: {
        shape: {
            dimension: {                        // normalize dimensions
                maxWidth: 100,
                maxHeight: 100,
                precision: 2
            },
            spacing: {
                padding: 0,                     // prevent adjacent edges showing
                box: 'content'                  // box-sizing strategy
            }
        }
    },
    // SPRITES
    // symbol
    symbols: {
        options: config_symbol,
        files: [
            {
                expand: true,
                cwd: '<%= src_img %>sprite/',
                src: ['**/symbols/*.svg'],
                dest: '<%= dest %>/assets/images/sprite/'
            },
            {
                expand: true,
                cwd: '<%= src_cmp %>',
                src: ['**/images/sprite/symbols/*.svg'],
                dest: '<%= dest %>/assets/images/sprite/'
            }
        ]
    },
    // view
    views: {
        options: config_view,
        files: [
            {
                expand: true,
                cwd: '<%= src_img %>sprite/',
                src: ['**/views/*.svg'],
                dest: '<%= dest %>/assets/images/sprite/'
            },
            {
                expand: true,
                cwd: '<%= src_cmp %>',
                src: ['**/images/sprite/views/*.svg'],
                dest: '<%= dest %>/assets/images/sprite/'
            }
        ]
    },
    // MINIFICATION ONLY
    // embedded graphics
    inline: {
        options: config_optimize,
        files: [
            {
                expand: true,
                cwd: '<%= src_img %>inline/',
                src: ['**/*.svg'],
                dest: '<%= dest %>/assets/images/inline/'
            },
            {
                expand: true,
                cwd: '<%= src_cmp %>',
                src: ['**/images/inline/*.svg'],
                dest: '<%= dest %>/assets/images/inline/'
            }
        ]
    },
    // linked graphics
    linked: {
        options: config_optimize,
        files: [
            {
                expand: true,
                cwd: '<%= src_img %>linked/',
                src: ['**/*.svg'],
                dest: '<%= dest %>/assets/images/linked/'
            },
            {
                expand: true,
                cwd: '<%= src_cmp %>',
                src: ['**/images/linked/*.svg'],
                dest: '<%= dest %>/assets/images/linked/'
            }
        ]
    }

};
