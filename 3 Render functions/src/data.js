const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// var baseDir = path.dirname(__dirname)+"/";
var baseDir = __dirname+"/";
console.log("Base dir", baseDir);
var loadingQueue = [];

// Source files
var sources = {};
function preloadSourceFile(filename) {
	loadingQueue.push(new Promise(function (resolve, reject) {
		fs.readFile(baseDir+filename, 'utf-8', function (err, sourceData) {
			console.log("Loading source file", filename);
			if (err) {
				console.log("error preloading "+filename, err);
				reject(err);
			} else {
				sources[filename] = sourceData;
				resolve();
			}
		});
	}));
}

// Data URLs
var dataURLs = {};
var rawDataURLs = {};
function preloadDataURL(filename, raw) {
    loadingQueue.push(new Promise(function (resolve, reject) {
        var ext = filename.match(/\..*$/)[0];

        var mimeType = "text/plain";
        switch (ext) {
            case '.svg': mimeType = 'image/svg+xml'; base64 = false; break;
			case '.png': mimeType = 'image/png'; break;
			case '.woff': mimeType = 'application/font-woff;charset=utf-8'; break;
			case '.woff2': mimeType = 'application/font-woff2;charset=utf-8'; break;
        }
        // console.log("ext", ext, "mime type", mimeType);
		
		fs.readFile(baseDir+filename+".base64", 'utf-8', function (err, base64data) {
			if (err) {
                console.log("Loading original file", filename);
                fs.readFile(baseDir+filename, 'utf-8', function (err, data) {
                    if (err) {
                        console.log("error preloading "+filename, err);
                        reject(err);
                    } else {
						if (!raw) {
							if (ext == '.svg') {
								data = data.replace(/<!--.*?-->/g, '');
								data = data.replace(/[\r\n]\s*/g, ' ');
								data = data.replace(/>\s*</g, '><');
								// data = data.replace(/>[\s\r\n]*</g, '><');
								data = data.replace(/^(.|[\r\n])*?<svg/, '<svg');
								data = data.replace(/\s*$/, '');
							}
						}
                        var dataURL = "data:"+mimeType+","+data;
                        dataURLs[filename] = dataURL;
                        resolve();
                    }
                });
			} else {
				console.log("Loading pre-encoded file", filename+".base64");
				if (!raw) {
					base64data = base64data.replace(/\n$/, '');
					base64data = base64data.replace(/\n/g, '\\\n');
				}
				var dataURL = "data:"+mimeType+";base64,"+base64data;
                dataURLs[filename] = dataURL;
                resolve();
			}
		});
	}));
};




const sourceFiles = [
	// core template
	// 'base.html.h',

	// pages
	// 'pages/build.html',
	// 'pages/cover.html',
	// 'pages/core.html', 
	// 'pages/combat.html', 
	// 'pages/inventory.html', 
	// 'pages/spellbook.html',
	// 'pages/sorcerer.html', 
	// 'pages/monk.html',

	// css modules
    'sass/mod-portrait.scss',
    'sass/mod-fonts.scss',
    'sass/mod-style-pathfinder.scss',
];

const rawDataURLFiles = [
	'images/favicon.png',
];

const dataURLFiles = [
	// images
	'images/h3.svg',
	'images/alignment-grid.svg',
	'images/icon-d20.svg',
	'images/icon-proficiency.svg',
	'images/icon-proficiency-trained.svg',
	'images/icon-proficiency-expert.svg',
	'images/icon-proficiency-master.svg',
	'images/icon-proficiency-legendary.svg',
	'images/icon-action.svg',
	'images/icon-action2.svg',
	'images/icon-action3.svg',
	'images/icon-reaction.svg',
	'images/icon-action-template.svg',
	'images/icon-gender.svg',
	'images/icon-hp.svg',
	'images/icon-damage.svg',
	'images/icon-size.svg',
	'images/icon-dc.svg',
	'images/icon-ac.svg',
	'images/icon-tac.svg',
	'images/icon-good.svg',
	'images/icon-evil.svg',
	'images/icon-lawful.svg',
	'images/icon-chaotic.svg',
	'images/swash.svg',
	
	'images/generic.svg',
	'images/logo.png',
	
	// fonts
	'fonts/RobotoCondensed-Regular.woff',
	'fonts/Merriweather-Black.woff',
	// 'fonts/RobotoCondensed-Regular.ttf',
	// 'fonts/RobotoCondensed-Bold.ttf',
	// 'fonts/Merriweather-Bold.ttf',
	// 'fonts/Merriweather-Black.ttf',
];

function getDataURL(filename, rawdata) {
	if (rawdata) {
		if (!_.has(rawDataURLs, filename)) {

		}
	}
	if (!_.has(dataURLs, filename)) {
		console.log("Data not found:", filename);
		return 'data:';
	}
	return dataURLs[filename];
}


global.dataurl = function (filename) {
	return getDataURL(filename, false);
}

global.dataurlraw = function (filename) {
	return getDataURL(filename, true);
}

module.exports = {
	preload: function () {
		console.log("Loading from", baseDir);
		sourceFiles.forEach(file => preloadSourceFile(file));
		dataURLFiles.forEach(file => preloadDataURL(file, false));
		rawDataURLFiles.forEach(file => preloadDataURL(file, true));
	},

	getDataURL: getDataURL,

	getSource: function (filename) {
		// console.log("getSource", filename);
		// console.log("Sources", sources);
		if (!_.has(sources, filename)) {
			console.log("Source not found:", filename);
			return '';
		}
		// console.log("Found source");
		return sources[filename];
	},

	waitForAll: function (callback) {
		// console.log("Waiting for all files to load");
		Promise.all(loadingQueue).then(callback);
	}
}