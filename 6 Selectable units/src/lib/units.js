const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const _ = require('lodash');

// const zone_composer = require('./zone-composer.js');
const zone_composer = require('./compose.js');
const unit_expander = require('./unit-expander.js');
const context = require('./context.js');

const baseDir = path.dirname(__dirname)+"/";

var loadedUnits = {};
var loadingQueue = [];

const ERR_LEEWAY = 3;

function loadUnit(unit_id) {
    var filename = "units/"+unit_id+".yml";
	loadingQueue.push(new Promise(function (resolve, reject) {
        // console.log("[units] Loading:", baseDir+filename);
		fs.readFile(baseDir+filename, 'utf-8', function (err, data) {
            if (err) {
                console.log("[units] Error preloading unit "+unit_id, err);
                reject(err);
                return;
            }

            // parse the data
            try {
                var unitdata = yaml.parse(data);
            } catch (exception) {
                console.log("[units] YAML error in "+unit_id+".yml:", exception.message);

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

            // unitdata = _.defaults(unitdata, {
            //     group: '',
            //     id: false,
            //     inc: []
            // });
            // console.log(`[units] Expanding ${filename}`);
            unitdata = unit_expander.expand(unitdata);

            fs.writeFile(baseDir+'tmp-'+unit_id+'.yml', yaml.stringify(unitdata), err => {});

            // store the data
            loadedUnits[unit_id] = unitdata;
            resolve();
        });
    }));
}

loadUnit('document');
// loadUnit('base-pathfinder2');

module.exports = function (unit_ids) {
    unit_ids.forEach(unit_id => {
        loadUnit(unit_id);
    });

    return {
        ready: (fn) => {
            Promise.all(loadingQueue).then(() => {
                fn();
            });
        },

        document: () => {
            console.log("[units] Combining units:", unit_ids);
            var document = zone_composer(loadedUnits['document']);
            
            unit_ids.forEach(unit_id => {
                var unit = loadedUnits[unit_id];
                if (!_.has(loadedUnits, unit_id)) {
                    console.log("Unit not loaded:", unit_id);
                    return;
                }
                // console.log("Unit:", JSON.stringify(unit, null, 2));

                if (!_.has(unit, "inc")) {
                    return;
                }
                unit.inc.forEach(include => {
                    if (_.has(include, "at")) {
                        document.addAt(include.at, include.add);
                    }
                    if (_.has(include, "define")) {
                        var defaults = _.has(include, "defaults") ? include.defaults : {};
                        document.defineTemplate(include.define, defaults, include.contents);
                    }
                });
            });
            var doc = document.document();
            doc = context(doc);
            return doc;
        }
    }
}