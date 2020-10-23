module.exports = function(config) {

	var customLaunchers = {};

	customLaunchers['HeadlessFirefox'] = {
									base: 'Firefox',
									flags: [
										'-headless',
									]
								};

	customLaunchers['HeadlessChrome'] = {
									base: 'ChromeHeadless',
									flags: [
										'--disable-translate',
										'--disable-extensions',
										'--remote-debugging-port=9223'
									]
								};


	var targets = {
		'HeadlessFirefox': ['HeadlessFirefox'],
		'HeadlessChrome': ['HeadlessChrome']
	};

	var reporters = ['mocha','coverage'];

	var browsers = targets[process.env.TARGET || 'HeadlessFirefox'];

	config.set({
		frameworks: ['mocha', 'chai'],
		files: [
			'dist/how-long-till-lunch.umd.js',
			'test/test.js'
		],
		preprocessors: {
			// note, the final coverage will be for the files in the /src/ directory, but the preprocessor works off of the files in /dist/
			'dist/*.js': ['sourcemap','coverage'],
		},
		coverageReporter: {
			reporters:[
				{type: 'lcov'},
				{type: 'text-summary'},
			],
			dir: 'coverage/'
		},
		customLaunchers: customLaunchers,
		reporters: reporters,
		logLevel: config.LOG_INFO,
		browsers: browsers,
		singleRun: true
	});
};
