'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const sass = require('node-sass');
const Handlebars = require('handlebars');

// set up helpers to replace data URLs in stylesheets
Handlebars.registerHelper('dataurl', function (filename, options) {
    // log("units", "dataurl:", filename, " Options:", options);
    var unit = options.data.root.unit;
    // var data = CharacterSheets._assets[unit][filename];
    // return toDataURL(data, filename);
    // return getDataURL(filename, false);
    return getDataURL(unit, filename);
});

Handlebars.registerHelper('dataurlraw', function (filename, options) {
    // log("units", "dataurlraw:", filename, " Options:", options);
    var unit = options.data.root.unit;
    // var asset = CharacterSheets._assets[unit][filename];
    // return toDataURL(data, filename);
	// return getDataURL(filename, true);
    return getDataURL(unit, filename);
});


// load units
CharacterSheets._units = {};
CharacterSheets._assets = {};
CharacterSheets._allAssets = {};

CharacterSheets.getUnit = function (unitcode) {
    log("units", "getUnit", unitcode);
    if (_.has(CharacterSheets._units, unitcode))
        return CharacterSheets._units[unitcode];
    else
        error("units", "getUnit: Unknown unit", unitcode);
};

CharacterSheets.getUnits = function (unitcodes) {
    log("units", "getUnits", unitcodes);
    return _.map(unitcodes, code => CharacterSheets.getUnit(code));
};

CharacterSheets.loadQueue.units.walkDirectory('./units', fn => fn.match(/\.yml$/), (data, unitfile) => {
    // log("units", "Loading unit", unitfile);
    
    var shortfile = path.basename(unitfile);
    var unitdir = path.dirname(unitfile);
    
    // parse the data
    try {
        // log("units", "Loading unit", unitfile);
        var unitdata = yaml.parse(data);
        if (unitdata == null) {
            error("units", "Empty unit", shortfile);
            return;
        }
    } catch (exception) {
        error("units", "Error parsing", shortfile, exception.message);

        // print an excerpt to make debugging easier
        if (_.has(exception, "source") && _.has(exception.source, "range")) {
            var range = exception.source.range;
            var start = data.lastIndexOf("\n", range.start);
            var end = data.indexOf("\n", range.end);
            for (var i = 0; i < ERR_LEEWAY; i++) {
                start = data.lastIndexOf("\n", start - 1);
                end = data.indexOf("\n", end + 1);
            }
            var excerpt = data.substring(start, end);
            error("units", excerpt);
            // console.log(excerpt);
        }

        reject();
        return;
    }

    try {
        var unitcode = unitdata.unit;
        unitdata.id = unitcode;
        var name = unitdata.name;
        log("units", "Loading unit", unitcode, "-", name);

        // TODO: Preprocess the data??
        
        unitdata = CharacterSheets.expandZone(unitdata);

        var data = yaml.stringify(unitdata);
        fs.writeFile("../debug/"+unitcode.replace(/\//g, '-')+".yml", data, err => {
            if (err) error("units", "Error saving unit", unitcode, err);
        });

        unitdata.stylesheet = '';
        // unitdata.assets = {};
        CharacterSheets._units[unitcode] = unitdata;
        CharacterSheets._assets[unitcode] = {};

        // Load unit stylesheet
        var stylesheetfile = './units/'+unitdir+'/stylesheet/'+shortfile.replace(/\.yml$/, '.scss');

        if (fs.existsSync(stylesheetfile)) {
            CharacterSheets.loadQueue.stylesheets.enqueue(stylesheetfile, function (resolve, reject) {
                log("units", "Loading stylesheet", unitcode);
            
                sass.render({
                    file: stylesheetfile,
                    // outputStyle: 'compressed',
                    outputStyle: 'compact',
                }, function(err, result) {
                    if (err) {
                        error("units", "Error rendering", unitcode, err);
                        reject(err);
                        return;
                    }

                    var css = result.css.toString();
                    CharacterSheets.loadQueue.assets.ready(() => {
                        var template = Handlebars.compile(css);
                        var rendered = `/* ${unitcode} */\n`+template({
                            unit: unitcode
                        });

                        // if (rendered.length > 0)
                        //     log("units", "Loaded stylesheet:", unitcode, rendered.substring(0, 30)+"...");
                        // else
                        //     log("units", "Empty stylesheet:", unitcode);
                        CharacterSheets._units[unitcode].stylesheet = rendered;
                        resolve();
                    });
                });
            });
        }

        // Load unit assets
        // log("unit", "Looking for assets:", './'+unitdir+'/assets');
        CharacterSheets.loadQueue.assets.walkDirectory('./units/'+unitdir+'/assets', fn => true, (data, assetfile) => {
            log("units", "Asset loaded", unitcode+":"+assetfile);
            // process asset data now, or later?

            // unitassets[assetfile] = data;
            CharacterSheets._assets[unitcode][assetfile] = data;
            CharacterSheets._allAssets[assetfile] = data;
        });
        if (_.has(unitdata, "assets")) {
            var assets = unitdata.assets;
            CharacterSheets.loadQueue.assets.ready(() => {
                unitdata.assets = [];
                _.each(assets, filename => {
                    var assetdata = { name: filename };
                    if (filename.match(/\.svg$/)) {
                        assetdata.data = (_.has(CharacterSheets._assets, unitcode) && _.has(CharacterSheets._assets[unitcode], filename) && !_.isEmpty(CharacterSheets._assets[unitcode][filename])) ?
                            CharacterSheets._assets[unitcode][filename] :
                            CharacterSheets._allAssets[filename];
                    } else {
                        var base64name = filename+".base64";
                        assetdata.base64 = (_.has(CharacterSheets._assets, unitcode) && _.has(CharacterSheets._assets[unitcode], base64name) && !_.isEmpty(CharacterSheets._assets[unitcode][base64name])) ?
                            CharacterSheets._assets[unitcode][base64name] :
                            CharacterSheets._allAssets[base64name];
                    }
                    unitdata.assets.push(assetdata);
                })
            });
        }
        // walkAssets(unitdir+'/assets', "", unitcode);

    } catch (exception) {
        error("units", "Error reading", shortfile, exception);
    }
});






/*

return;

(() => {
    function loadUnit(unitfile) {
        log("units", "Loading unit", unitfile);
        var shortfile = path.basename(unitfile);
        var unitdir = path.dirname(unitfile);

        CharacterSheets.loadQueue.units.loadItem(unitfile, data => {
            // parse the data
            try {
                // log("units", "Loading unit", unitfile);
                var unitdata = yaml.parse(data);
                if (unitdata == null) {
                    error("units", "Empty unit", shortfile);
                    return;
                }
            } catch (exception) {
                error("units", "Error parsing", shortfile, exception.message);

                // print an excerpt to make debugging easier
                if (_.has(exception, "source") && _.has(exception.source, "range")) {
                    var range = exception.source.range;
                    var start = data.lastIndexOf("\n", range.start);
                    var end = data.indexOf("\n", range.end);
                    for (var i = 0; i < ERR_LEEWAY; i++) {
                        start = data.lastIndexOf("\n", start - 1);
                        end = data.indexOf("\n", end + 1);
                    }
                    var excerpt = data.substring(start, end);
                    console.log(excerpt);
                }

                reject();
                return;
            }

            try {
                var unitcode = unitdata.unit;
                unitdata.id = unitcode;
                var name = unitdata.name;
                log("units", "Loading unit", unitcode, "-", name);

                // TODO: Preprocess the data??

                
                var data = yaml.stringify(unitdata);
                fs.writeFile("../debug/"+unitcode.replace(/\//g, '-')+".yml", data, err => {
                    if (err) error("units", "Error saving unit", unitcode, err);
                });

                CharacterSheets._units[unitcode] = {
                    data: unitdata,
                    assets: {}
                };

                // Load unit stylesheet
                var stylesheetfile = unitdir+'/stylesheet/'+shortfile.replace(/\.yml$/, '.scss');
                fs.readFile(stylesheetfile, 'utf-8', (err, data) => {
                    if (err)
                        return;

                    log("units", "Loading stylesheet", unitcode);
                    
                    sass.render({
                        file: stylesheetfile,
                        outputStyle: 'compressed',
                    }, function(err, result) {
                        if (err) {
                            error("units", "Error rendering", unitcode, err);
                            // reject(err);
                            return;
                        }

                        // substitute 
                        var css = result.css.toString();
                        // preloadLinkedData(css, stylesheetfile);
                        CharacterSheets._units[unitcode].stylesheet = css;
                        // resolve();
                    });
                });

                // Load unit assets
                walkAssets(unitdir+'/assets', "", unitcode);

            } catch (exception) {
                error("units", "Error reading", shortfile, exception);
            }
        });
    }

    function walkAssets(dir, rel, unitcode) {
        fs.readdir(dir, { withFileTypes: true }, (err, files) => {
            if (err) return;
            _.each(files, file => {
                var absfile = dir+"/"+file.name;
                if (file.isDirectory()) {
                    walkAssets(absfile, (rel == "" ? "" : rel+"/")+file.name, unitcode);
                } else if (file.name.match(/\.base64$/)) {
                    var filename = rel+"/"+file.name.replace(/\.base64$/, '');
                    // ... do something with assets?
                    fs.readFile(absfile, 'utf-8', (err, data) => {
                        if (err) {
                            error("units", "Error loading asset", absfile, err);
                            return;
                        }

                        if (!_.has(CharacterSheets._units, unitcode)) {
                            error("units", "Missing unit", unitcode);
                        }
                        log("units", "Found encoded asset", unitcode+":"+filename);
                        CharacterSheets._units[unitcode].assets[filename] = {
                            data: data,
                            base64: true
                        }
                    });
                } else if (file.name.match(/\.svg$/)) {
                    fs.readFile(absfile, 'utf-8', (err, data) => {
                        if (err) {
                            error("units", "Error loading asset", absfile, err);
                            return;
                        }

                        if (!_.has(CharacterSheets._units, unitcode)) {
                            error("units", "Missing unit", unitcode);
                        }
                        log("units", "Found asset", unitcode+":"+file.name);
                        CharacterSheets._units[unitcode].assets[file.name] = {
                            data: data,
                            base64: false
                        }
                    });
                }
            });
        });
    }

    function walkUnits(dir) {
        // log("units", "Walking dir", dir);
        fs.readdir(dir, { withFileTypes: true }, (err, files) => {
            if (err) return;
            // log("units", "Dir files", files);
            _.each(files, file => {
                var absfile = dir+"/"+file.name;
                if (file.isDirectory()) {
                    walkUnits(absfile);
                } else if (file.name.match(/\.yml$/)) {
                    loadUnit(absfile);
                }

            });
        });
    }

    fs.realpath('./units', (err, unitsdir) => {
        if (err) {
            error("units", "Cannot find units", err);
        } else  {
            walkUnits(unitsdir);
            setTimeout(function () {
                log("units", "Saving units");
                var data = yaml.stringify(CharacterSheets._units);
                fs.writeFile("../debug/units.yml", data, err => {
                    if (err) error("units", "Error saving units", err);
                });
                data = JSON.stringify(CharacterSheets._units);
                fs.writeFile("../debug/units.json", data, err => {
                    if (err) error("units", "Error saving units", err);
                });
            }, 5000);
        }
    });
})();
*/
