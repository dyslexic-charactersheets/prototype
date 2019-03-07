const fs = require('fs');

// load files first
require('./lib/data.js');
require('./lib/preload.js');
require('./lib/stylesheet.js');

// parts
require('./lib/registry.js');
require('./lib/util.js');
require('./lib/parts.js');

const units = require('./lib/units.js');

// Create a document from units

// Barbarian
var selectedUnits = [ 'base-pathfinder2', 'option-build', 'ancestry-human', 'class-barbarian', 'option-permission' ];
// global.documentColour = '#264e80'; // faded blue
// global.accentColour = '#a65e08';

// Wizard
// var selectedUnits = [ 'base-pathfinder2', 'option-build', 'ancestry-elf', 'class-wizard', 'option-permission', 'feat-wizard-counterspell', 'option-animal-companion' ];
global.documentColour = '#661b14'; // red
global.accentColour = '#b38000'; // gold

// var selectedUnits = [ 'option-animal-companion' ];

// global.documentColour = '#601008'; // red
// global.documentColour = '#083060'; // strong blue

var character = units(selectedUnits);
character.ready(() => {
    var document = character.document();
    // console.log("Document:", JSON.stringify(document, null, 2));
    fs.writeFile('../prototype6.json', JSON.stringify(document, null, 2), (err) => {});

    waitForData(() => {
        var dist = renderItem(document);
        fs.writeFile('../prototype6.html', dist, (err) => {
            if (!!err)
                console.log("Error", err);
            console.log("[index] OK");
        });
    });
});
