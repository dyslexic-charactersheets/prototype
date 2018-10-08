const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const baseDir = path.dirname(__dirname)+"/";
// console.log("Base dir:", baseDir);

var loadingQueue = [];

var storedData = {};
var base64Data = {};
var storedDataURLs = {};

const MIME_SVG = 'image/svg+xml';
const MIME_PNG = 'image/png';
const MIME_JPEG = 'image/jpeg';
const MIME_WOFF = 'application/font-woff;charset=utf-8';
const MIME_WOFF2 = 'application/font-woff2;charset=utf-8'
const MIME_SCSS = 'text/x-scss';
const MIME_HANDLEBARS = 'text/x-handlebars';

function mimeType(filename) {
    var ext = filename.match(/\..*$/)[0];
    switch (ext) {
        case '.svg': return MIME_SVG;
        case '.png': return MIME_PNG;
        case '.jpg': case '.jpeg': return MIME_JPEG;
        case '.woff': return MIME_WOFF;
        case '.woff2': return MIME_WOFF2;
        case '.scss': return MIME_SCSS;
        case '.h': return MIME_HANDLEBARS;
        default: return "text/plain";
    }
}

global.preloadLinkedData = function(data, filename) {
    switch(mimeType(filename)) {
        case 'text/x-scss':
            var re = /\{\{\{dataurl "(.*?)"\}\}\}/g
            do {
                m = re.exec(data);
                if (m) {
                    preloadData(m[1]);
                }
            } while (m);
            break;
    }
}

function processBase64(data) {
    data = data.replace(/\n$/, '');
    data = data.replace(/[\r\n]/g, '');
    return data;
}

function processSVG(data) {
    // console.log("processSVG");
    data = data.replace(/<!--.*?-->/g, '');
    data = data.replace(/[\r\n]\s*/g, ' ');
    data = data.replace(/>\s*</g, '><');
    // data = data.replace(/>[\s\r\n]*</g, '><');
    data = data.replace(/^(.|[\r\n])*?<svg/, '<svg');
    data = data.replace(/\s*$/, '');
    data = data.replace(/#/g, '%23');
    return data;
}

function processRaw(data) {
    // console.log("processRaw");
    data = data.replace(/#/g, '%23');
    return data;
}

global.preloadQueue = function(promise) {
    loadingQueue.push(promise);
}

global.preloadData = function(filename, {
    required = false, 
    base64 = false, 
    preloadLinked = false, 
    raw = false,
} = {}) {
    // load the base64-encoded file, if it exists
    if (base64) {
        // console.log("[data] Loading base64 data for:", baseDir+filename+".base64");
        loadingQueue.push(new Promise(function (resolve, reject) {
            fs.readFile(baseDir+filename+".base64", 'utf-8', function (err, data) {
                if (required && err) {
                    console.log("[data] Error preloading "+filename+".base64", err);
                    reject(err);
                    return;
                }
                
                // console.log("[data] Found file (base64)", filename);
				if (!raw) {
                    data = processBase64(data);
				}
                base64Data[filename] = data;
                resolve();
            });
        }));
    }

    // load the actual file
	loadingQueue.push(new Promise(function (resolve, reject) {
		fs.readFile(baseDir+filename, 'utf-8', function (err, data) {
            if (required && err) {
                console.log("[data] Error preloading "+filename, err);
                reject(err);
                return;
            }
            
            // console.log("[data] Found file", filename);
            // process the data
            if (!raw) {
                switch (mimeType(filename)) {
                    case MIME_SVG: data = processSVG(data); break;
                    default: data = processRaw; break;
                }
            }

            // store the data
            storedData[filename] = data;
            if (preloadLinked)
                preloadLinkedData(data);
            resolve();
        });
    }));
};

global.waitForData = function (callback) {
    Promise.all(loadingQueue).then(callback);
};

global.getDataSource = function (filename) {
    if (_.has(storedData, filename)) {
        return storedData[filename];
    }
    
    console.log("[data] No data for", filename);
    return null;
};

global.getDataBase64 = function (filename) {
    if (_.has(base64Data, filename)) {
        return base64Data[filename];
    }

    // encode it!
    if (_.has(storedData, filename)) {
        console.log("[data] Need to base64-encode a file:", filename);
        // ...
    }

    console.log("[data] No base64 data for", filename);
    return null;
};

global.getDataURL = function (filename) {
    if (_.has(storedDataURLs, filename)) {
        return storedDataURLs[filename];
    }

    var mime = mimeType(filename);
    var dataurl;
    switch (mime) {
        case MIME_SVG:
            var data = getDataSource(filename);
            if (_.isNull(data)) return '';
            dataurl = 'data:'+mime+','+data;
            break;
        default:
            var base64 = getDataBase64(filename);
            if (_.isNull(base64)) return '';
            dataurl = 'data:'+mime+';base64,'+base64;
    }

    storedDataURLs[filename] = dataurl;
    return dataurl;
};