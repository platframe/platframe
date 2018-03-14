module.exports = {

    // assets to be transferred without modification

    dev: {
        files: [
            // linked bitmaps
            {
                expand: true,
                cwd: '<%= src_img %>/linked/',
                src: ['**/*.{jpg,jpeg,gif,webp}'],
                dest: '<%= dev_img %>/linked/',
                extDot: 'last'
            },
            // linked bitmaps in components
            {
                expand: true,
                cwd: '<%= src_cmp %>',
                src: ['**/images/linked/*.{jpg,jpeg,gif,webp}'],
                dest: '<%= dev_img %>/linked/',
                extDot: 'last'
            },
            // fonts
            {
                expand: true,
                cwd: '<%= src_fnt %>',
                src: ['**/*.{ttf,svg,woff*}'],
                dest: '<%= dev_fnt %>',
                extDot: 'last'
            }
        ],
        verbose: true,
        updateAndDelete: false // remove files from dest that are not in src
    },

    prod: {
        files: [
            // linked bitmaps
            {
                expand: true,
                cwd: '<%= src_img %>/linked/',
                src: ['**/*.{jpg,jpeg,gif,webp}'],
                dest: '<%= prod_img %>/linked/',
                extDot: 'last'
            },
            // linked bitmaps in components
            {
                expand: true,
                cwd: '<%= src_cmp %>',
                src: ['**/images/linked/*.{jpg,jpeg,gif,webp}'],
                dest: '<%= prod_img %>/linked/',
                extDot: 'last'
            }
        ]
    }

};
