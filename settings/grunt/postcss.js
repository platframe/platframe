module.exports = {

    dev: {
        options: {
            processors: [
                require('autoprefixer')({
                    // browsers: manage via "browserslist" in package.json
                    cascade: true
                })
            ]
        },
        files: {
            '<%= dev_css %>root.css': '<%= dev_css %>root.css'
        }
    },
    prd: {
        options: {
            processors: [
                require('autoprefixer'),
                require('postcss-svgo')(), // minify inline svg
                require('css-mqpacker')({ sort: true }), // order min-width queries
                require('cssnano')()
            ]
        },
        files: {
            '<%= prd_css %>root.css': '<%= prd_css %>root.css'
        }
    }

};
