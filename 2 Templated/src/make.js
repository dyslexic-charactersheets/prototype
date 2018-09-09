const fs = require('fs');
// const util = require('util');

const _ = require('lodash');
const Handlebars = require('handlebars');
// const async = require('async');

const data = require('../src/make/data.js');
data.preload();
// const shim = require('../src/make/shim.js');
// const readFile = shim.readFile;


Handlebars.registerHelper('dataurl', function (filename) {
	return data.getDataURL(filename, false);
});

Handlebars.registerHelper('dataurlraw', function (filename) {
	return data.getDataURL(filename, true);
});

Handlebars.registerHelper('source', function (filename) {
	var source = data.getSource(filename);
	var cssTemplate = Handlebars.compile(source);
	return cssTemplate({});
});

Handlebars.registerHelper('stylesheet', function (filename) {
	console.log("Embed stylesheet", filename);
	var cssSource = data.getSource('css/'+filename+".css");
	var cssTemplate = Handlebars.compile(cssSource);
	return cssTemplate({});
})

data.waitForAll(function () {
	try {
		var baseTemplateSource = data.getSource('base.html.h');
		var baseTemplate = Handlebars.compile(baseTemplateSource);

		var cssBaseSource = data.getSource('css/stylesheet.css');
		var cssBaseTemplate = Handlebars.compile(cssBaseSource);
		var css = cssBaseTemplate({});

		var pages = [];
		_.each(['build', 'cover', 'core', 'combat', 'inventory', 'monk'], function (pageid) {
			var pageSource = data.getSource('pages/'+pageid+'.html');
			var pageTemplate = Handlebars.compile(pageSource);
			var pageBody = pageTemplate({});

			pages.push({
				body: pageBody
			});
		});
		
		console.log("Building");
		var dist = baseTemplate({
			title: "2nd Prototype",
			css: css,
			pages: pages
		});
		fs.writeFile('prototype2.html', dist);
	} catch (err) {
		console.log("Error", err);
	}
});
