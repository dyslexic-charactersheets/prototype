const fs = require('fs');

// utility function to read a file asynchronously and return a promise.
function readFile (filename, callback) {
    return new Promise(function (resolve,reject) {
    	// console.log("async read file:", filename);
    	fs.readFile(filename, 'utf-8', function (err, source) {
    		// console.log("Read file:", filename);
    		if (err) {
    			console.log("error", err);
    			reject(err);
    		} else {
    			// console.log("ok");
    			var res = callback(source);
    			resolve(res);
    		}
    	});
    });
}

/*
function makeDataURL(data, datatype) {
    var base64 = true;
    var mimeType = "text/plain";
    switch (datatype) {
        case 'svg': mimeType = 'image/svg+xml'; base64 = false; break;
        case 'png': mimeType = 'image/png'; break;
    }

    if (base64) {
        var encoded = new Buffer(data, 'binary').toString('base64');
        // var encoded = global.btoa(data);

        var lines = encoded.match(/.{1,76}/g);
        data = lines.join("\n");
        // data = encoded;
    } else if (datatype == 'svg') {
        var encoded = data.replace(/[\r\n\t ]+/g, ' ').replace(/> </g, '><').replace(/ $/, '').replace(/#/g, '%23');
        data = encoded.replace(/<!--.*?-->/, '');
    }

    return 'data:'+mimeType+(base64?';base64':'')+','+data;
}

function readFileToDataURL(filename, callback) {
    return new Promise(function (resolve, reject) {
        var ext = filename.match(/\..*$/)[0];

        var mimeType = "text/plain";
        switch (ext) {
            case '.svg': mimeType = 'image/svg+xml'; base64 = false; break;
            case '.png': mimeType = 'image/png'; break;
        }
        console.log("ext", ext, "mime type", mimeType);

        console.log("Testing access to "+filename+".base64");
        
		fs.readFile(filename+".base64", 'utf-8', function (err, base64data) {
			if (err) {
                console.log("Loading original file", err);
                fs.readFile(filename, 'utf-8', function (err, data) {
                    if (err) {
                        console.log("error", err);
                        reject(err);
                    } else {
                        var dataURL = "data:"+mimeType+","+data;
                        var res = callback(dataURL);
                        resolve(res);
                    }
                });
			} else {
                console.log("Loading pre-encoded file");
                var dataURL = "data:"+mimeType+";base64,"+base64data;
                var res = callback(dataURL);
                resolve(res);
			}
        });
    
        console.log("Did a thing");
    });
}
*/

module.exports = {
    readFile: readFile
    // readFileToDataURL: readFileToDataURL,
    // makeDataURL: makeDataURL,
};
