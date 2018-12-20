module.exports = {

    'env': {
        'es6': true,
        'node': true,
        'browser': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'globals': {
        'Backbone': false,
        'API_HOST': false,
        'API_PORT': false,
    },
    'rules': {},

};
