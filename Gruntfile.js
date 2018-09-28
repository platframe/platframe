module.exports = function(grunt) {

    // monitor execution time
    require('time-grunt')(grunt);

    var env, dest,

        // roots
        dev  = 'dev',
        prd  = 'prd',
        conf = 'settings',
        root = process.cwd(),

        // get task name
        task = grunt.cli.tasks[0];
        
    // establish environment intent from target or task, defaults to: grunt --env=dev
    if (grunt.option && (grunt.option('env') === 'development' || grunt.option('env') === 'production')) {
        env = grunt.option('env');
    } else {
        switch (task) {
        case 'development':
            env = 'dev';
            break;
        case 'test':
            env = 'prd';
            break;
        case 'production':
            env = 'prd';
            break;
        case 'serve':
            env = 'prd';
            break;
        case 'preflight':
            env = 'prd';
            break;
        case 'deploy':
            env = 'prd';
            break;
        default:
            env = 'dev';
        }
    }

    // set dynamic destination based on environment
    dest = env;

    // adapt dynamic dest for modified roots
    if (dev !== 'dev' || prd !== 'prd') {
        if (env === 'development') {
            dest = dev;
        } else if (env === 'production') {
            dest = prd;
        }
    }

    // load tasks & configurations
    require('load-grunt-config')(grunt, {

        configPath: require('path').join(process.cwd(), conf + '/grunt'),

        // pass data to task configs
        data: {

            env, // current environment

            /* define root paths */

            root: root, // canonical root
            dest: dest, // destination (rel to env)
            conf: conf, // build configuration

            src: 'src', // source
            src_log: '<%= src %>/logic/',
            src_htm: '<%= src %>/templates/',
            src_css: '<%= src %>/style/',
            src_img: '<%= src %>/images/',
            src_fnt: '<%= src %>/fonts/',
            src_cmp: '<%= src %>/components/',

            dev, // development
            dev_log: '<%= dev %>/assets/logic/',
            dev_htm: '<%= dev %>/',
            dev_css: '<%= dev %>/assets/style/',
            dev_img: '<%= dev %>/assets/images/',
            dev_fnt: '<%= dev %>/assets/fonts/',

            prd, // production
            prd_log: '<%= prd %>/assets/logic/',
            prd_htm: '<%= prd %>/',
            prd_css: '<%= prd %>/assets/style/',
            prd_img: '<%= prd %>/assets/images/',
            prd_fnt: '<%= prd %>/assets/fonts/'

        }

    });

};
