module.exports = {

    // global settings
    options: {
        spawn: false
    },

    // templates
    pug: {
        files: ['<%= src_htm %>**/*.pug', '<%= src_cmp %>**/*.pug'],
        tasks: ['pug:dev', 'bsReload:all']
    },
    // style
    style: {
        files: ['<%= src_css %>**/*.styl', '<%= src_cmp %>**/*.styl'],
        tasks: ['stylus:dev', 'postcss:dev', 'bsReload:style']
    },
    // logic
    js: {
        files: ['<%= src_cmp %>**/*.js', '<%= src_log %>js/**/*.js'],
        tasks: ['eslint', 'rollup', 'bsReload:js']
    },
    // logistics
    sync: {
        files: ['<%= src_img %>**/*.{jpg,jpeg,gif,webp}', '<%= src_fnt %>**/*.{ttf,svg,woff*}'],
        tasks: ['sync:dev']
    },
    // graphics: raster
    base64: {
        files: [
            '<%= src_img %>inline/**/*.{png,jpg,jpeg,gif,webp}',
            '<%= src_cmp %>**/images/inline/*.{png,jpg,jpeg,gif,webp}'
        ],
        tasks: ['base64']
    },
    png_linked: {
        files: [
            '<%= src_img %>linked/**/*.png',
            '<%= src_cmp %>**/images/linked/*.png'
        ],
        tasks: ['pngmin', 'bsReload:all']
    },
    // graphics: vector
    svg_symbols: {
        files: [
            '<%= src_img %>sprite/**/symbols/*.svg',
            '<%= src_cmp %>**/images/sprite/symbols/*.svg'
        ],
        tasks: ['svg_sprite:symbols', 'bsReload:all']
    },
    svg_views: {
        files: [
            '<%= src_img %>sprite/**/views/*.svg',
            '<%= src_cmp %>**/images/sprite/views/*.svg'
        ],
        tasks: ['svg_sprite:views', 'bsReload:all']
    },
    svg_inline: {
        files: [
            '<%= src_img %>inline/**/*.svg',
            '<%= src_cmp %>**/images/inline/*.svg'
        ],
        tasks: ['svg_sprite:inline']
    },
    svg_linked: {
        files: [
            '<%= src_img %>linked/**/*.svg',
            '<%= src_cmp %>**/images/linked/*.svg'
        ],
        tasks: ['svg_sprite:linked', 'bsReload:all']
    }

};
