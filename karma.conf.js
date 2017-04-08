module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        reporters: ['spec'],
        frameworks: ['jasmine'],
        files: [
            'tests/**/*.spec.js'
        ],
        preprocessors: {
            'tests/**/*': ['webpack'],
        },
        webpack: require("./webpack.config.js"),
    });
};
