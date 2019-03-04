const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
global._ = require('lodash');

// load files first
require('../src/lib/polyfill.js');
require('../src/lib/data.js');
require('../src/lib/preload.js');
require('../src/lib/stylesheet.js');

// parts
require('../src/lib/registry.js');
require('../src/lib/util.js');
require('../src/lib/parts.js');

const unit_expander = require('../src/lib/unit-expander.js');
// const zone_composer = require('../src/lib/zone-composer.js');
const zone_composer = require('../src/lib/compose.js');
const context = require('../src/lib/context.js');

global.documentColour = '#264e80'; // faded blue
global.accentColour = '#a65e08';

const ERR_LEEWAY = 3;
var tests = [ 
    // 'test1',
    // 'test2',
    // 'test3',
    // 'test4',
    // 'test5',
    // 'test6',
    'test7',
];

_.each(tests, test => {
    fs.readFile(test+".yml", 'utf-8', function (err, data) {
        if (err) {
            console.log("[test] Error loading test "+test, err);
            return;
        }

        // parse the data
        try {
            var testdata = yaml.parse(data);
        } catch (exception) {
            console.log("[test] YAML error in "+test+".yml:", exception.message);

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

            return;
        }

        console.log(JSON.stringify(testdata, null, 2));
        console.log(`[test] Expanding ${test}`);
        testdata = unit_expander.expand(testdata);
        console.log(JSON.stringify(testdata, null, 2));

        console.log(`[test] Composing ${test}`);
        var document = zone_composer(testdata.base);
        if (_.has(testdata, "inc")) {
            _.each(testdata.inc, include => {
                console.log("[test] Include", include);
                if (_.has(include, "at")) {
                    document.addAt(include.at, include.add);
                }
                if (_.has(include, "define")) {
                    var defaults = _.has(include, "defaults") ? include.defaults : {};
                    document.defineTemplate(include.define, defaults, include.contents);
                }
            });
        }
        testdata = document.document();

        console.log(`[test] Applying context defaults to ${test}`);
        testdata = context(testdata);

        fs.writeFile("result-"+test+".yml", yaml.stringify(testdata), err => {});
    });
});

// setTimeout(function () {
//     console.log("Done");
// }, 5000);