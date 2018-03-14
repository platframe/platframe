module.exports = function(grunt) {

    // monitor execution time
    require('time-grunt')(grunt);

    var env, dest,

        // environment root dir names
        dev  = 'dev',
        prod = 'prod',
        conf = 'config',
        root = process.cwd(),

        // get task name
        task = grunt.cli.tasks[0];

    // establish environment intent from target or task, defaults to: grunt --env=dev
    if (grunt.option && (grunt.option('env') === 'dev' || grunt.option('env') === 'prod')) {
        env = grunt.option('env');
    } else {
        switch (task) {
        case 'develop':
            env = 'dev';
            break;
        case 'test':
            env = 'prod';
            break;
        case 'build':
            env = 'prod';
            break;
        case 'serve':
            env = 'prod';
            break;
        case 'preflight':
            env = 'prod';
            break;
        case 'deploy':
            env = 'prod';
            break;
        default:
            env = 'dev';
        }
    }

    // set dynamic destination based on environment
    dest = env;

    // adapt dynamic dest for modified roots
    if (dev !== 'dev' || prod !== 'prod') {
        if (env === 'dev') {
            dest = dev;
        } else if (env === 'prod') {
            dest = prod;
        }
    }

    // load tasks & configurations
    require('load-grunt-config')(grunt, {

        configPath: require('path').join(process.cwd(), conf + '/grunt'),

        // pass data to task configs
        data: {

            env: env, // current environment

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

            dev: dev, // development
            dev_log: '<%= dev %>/assets/logic/',
            dev_htm: '<%= dev %>/',
            dev_css: '<%= dev %>/assets/style/',
            dev_img: '<%= dev %>/assets/images/',
            dev_fnt: '<%= dev %>/assets/fonts/',

            prod: prod, // production
            prod_log: '<%= prod %>/assets/logic/',
            prod_htm: '<%= prod %>/',
            prod_css: '<%= prod %>/assets/style/',
            prod_img: '<%= prod %>/assets/images/',
            prod_fnt: '<%= prod %>/assets/fonts/'

        }

    });

};
