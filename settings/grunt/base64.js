module.exports = {

    encode: {
        files: [
            {
                expand: true,
                cwd: '<%= src_img %>/inline/',
                src: ['**/*.{png,jpg,jpeg,gif,webp}'],
                dest: '<%= dev_img %>/inline/',
                ext: '.b64',
                extDot: 'last'
            },
            {
                expand: true,
                cwd: '<%= src_cmp %>',
                src: ['**/images/inline/*.{png,jpg,jpeg,gif,webp}'],
                dest: '<%= dev_img %>/inline/',
                ext: '.b64',
                extDot: 'last'
            }
        ]
    }

};
