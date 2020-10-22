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
			'src/*.js': ['coverage'],
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
		//logLevel: config.LOG_INFO,
		logLevel: config.LOG_DEBUG,
		browsers: browsers,
		singleRun: true
	});
};
