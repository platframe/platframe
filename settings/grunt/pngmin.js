module.exports = {

    minify: {
        options: {
            ext: '.png',
            quality: { min: 60, max: 80 },
            force: true,
            retry: true,
            speed: 3
        },
        files: [
            {
                expand: true,
                cwd: '<%= src_img %>/linked/',
                src: ['**/*.png'],
                dest: '<%= dest %>/assets/images/linked/',
                extDot: 'last'
            },
            {
                expand: true,
                cwd: '<%= src_cmp %>',
                src: ['**/images/linked/*.png'],
                dest: '<%= dest %>/assets/images/linked/',
                extDot: 'last'
            }
        ]
    }

};
