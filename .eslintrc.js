module.exports = {

    'extends': [
        `./settings/eslint/${ process.env.NODE_ENV || 'development' }.js`,
    ],
    'rules': {},

};