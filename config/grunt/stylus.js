module.exports = {

    options: {
        compress: false,
        define: { env: '<%= env %>' }
    },
    
    dev: {
        options: {
            linenos: true,
            banner: '/*! Build: Development | <%= package.name %> | v<%= package.version %> | <%= grunt.template.today("yyyy-mm-dd") %>*/'
        },
        files: {
            '<%= dev_css %>root.css': ['<%= src_css %>root.styl']
        }
    },
    
    prod: {
        options: {
            banner: '/*! <%= package.name %> | v<%= package.version %> | Build: <%= grunt.template.date("ddd mmm dd yyyy \'at\' HH:MM:ss \'(\'o \'UTC)\'") %> | License: <%= package.license %> | \u{00A9} <%= grunt.template.date("yyyy") %> <%= package.author %> */'
        },
        files: {
            '<%= prod_css %>root.css': ['<%= src_css %>root.styl']
        }
    }

};
