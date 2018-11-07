const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const Handlebars = require('handlebars');
const _ = require('lodash');

// select stylesheet parts
var stylesheetsUnits = [
    "fonts_pathfinder",
    "base",
    "size_normal",
    "style_pathfinder"
];

var stylesheets = {};

stylesheetsUnits.forEach(unit => {
    preloadQueue(new Promise(function (resolve, reject) {
        var filename = path.dirname(__dirname)+"/style/"+unit+"/"+unit+".scss";
        sass.render({
            file: filename,
            outputStyle: 'compressed',
            
        }, function(err, result) {
            if (err) {
                console.log("[stylesheet] Error preloading "+filename, err);
                reject(err);
                return;
            }

            // substitute 
            var css = result.css.toString();
            preloadLinkedData(css, filename);
            stylesheets[unit] = css;
            resolve();
        });
    }));
//     preloadData("style/"+unit+"/"+unit+".scss");
//     preloadData("style/"+unit+"/embed.css.h");
    // fs.
});

Handlebars.registerHelper('dataurl', function (filename) {
	return getDataURL(filename, false);
});

Handlebars.registerHelper('dataurlraw', function (filename) {
	return getDataURL(filename, true);
});


global.stylesheet = function () {
    // find both SASS-compiled and data-URL-embedded parts for each of those
    var cssParts = [];
    stylesheetsUnits.forEach(unit => {
        css = stylesheets[unit];
        var template = Handlebars.compile(css);
        cssParts.push(template({}));

        // // console.log("[stylesheet] Looking for CSS for", unit);
        // var filename = path.dirname(__dirname)+"/style/"+unit+"/"+unit+".scss";
        // // console.log("[stylesheet] SASS filename:", filename);
        // if (fs.existsSync(filename)) {
        //     console.log("[stylesheet] Found SASS component for", unit);
        //     var sassResult = sass.renderSync({
        //         file: filename,
        //         outputStyle: 'compressed',
        //     });
            
        //     var template = Handlebars.compile(sassResult.css.toString());
        //     cssParts.push(template({}));
        // }
    });

    // put it all together
    console.log("[stylesheet] Found", cssParts.length, "stylesheet parts");
    return cssParts.join();
};