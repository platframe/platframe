module.exports = {

    encode: {
        files: [
            {
                expand: true,
                cwd: '<%= src_img %>/inline/',
                src: ['**/*.png'],
                dest: '<%= dev_img %>/inline/',
                ext: '.b64',
                extDot: 'last'
            },
            {
                expand: true,
                cwd: '<%= src_cmp %>',
                src: ['**/images/inline/*.png'],
                dest: '<%= dev_img %>/inline/',
                ext: '.b64',
                extDot: 'last'
            }
        ]
    }

};
