module.exports = {

    options: {
        data: {
            env: '<%= env %>',
            version: '<%= package.version %>',
            timestamp: '<%= new Date().getTime() %>'
        }
    },

    dev: {
        options: {
            pretty: true
        },
        files: [{
            expand: true,
            cwd: '<%= src_htm %>views',
            src: [ '**/!(_)*.pug', '!**/_/**'], // exclude partials
            dest: '<%= dev_htm %>',
            ext: '.html'
        }]
    },

    prod: {
        files: [{
            expand: true,
            cwd: '<%= src_htm %>views',
            src: [ '**/!(_)*.pug', '!**/_/**'], // exclude partials
            dest: '<%= prod_htm %>',
            ext: '.html'
        }]
    }

};
