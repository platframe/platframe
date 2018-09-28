module.exports = {

    'extends': './base.js',
    'globals': {
        'ENV': false,
        'VERSION': false,
    },
    'rules': {
        'indent': [
            'warn',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'warn',
            'single',
        ],
        'semi': [
            'warn',
            'always',
        ],
        'eqeqeq': 'warn',
        'no-console': 'off',
        'no-inner-declarations': 'off',
        'no-multiple-empty-lines': [
            'warn', {
                'max': 1,
                'maxEOF': 1,
            }
        ],
        'space-before-function-paren': [
            'warn', {
                'anonymous': 'never',
                'named': 'never',
                'asyncArrow': 'always',
            },
        ]
    },

};