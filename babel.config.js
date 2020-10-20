module.exports = function(api) {

    // dynamic config: require cache opt
    // gets cleared on environment change
    api.cache.invalidate(() => process.env.NODE_ENV);

    return {
        presets: [
            ['@babel/preset-env'],
        ],
        plugins: [
            [   // enable static property syntax for ES2015 classes
                require("@babel/plugin-proposal-class-properties"),
                { loose: false },
            ]
        ],
    };

};
