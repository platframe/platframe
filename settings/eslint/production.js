module.exports = {

    'extends': './development.js',
    'rules': {
        'semi': [
            'error',
            'always',
        ],
        'eqeqeq': 'error',
        'no-undef': 'warn',
        'no-console': ['error',
            {
                allow: ['warn', 'error'],
            },
        ],
        'space-before-function-paren': [
            'error', {
                'anonymous': 'never',
                'named': 'never',
                'asyncArrow': 'always',
            },
        ]
    },

};
