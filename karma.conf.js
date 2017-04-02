module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        reporters: ['spec'],
        frameworks: ['jasmine'],
        files: [
            './src/**/*.spec.js'
        ],
        preprocessors: {
            './src/**/*.spec.js': ['webpack']
        },
        webpack: require("./webpack.config.js"),
    });
};
