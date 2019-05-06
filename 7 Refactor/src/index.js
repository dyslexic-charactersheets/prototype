const fs = require('fs');
require('./lib/main/main.js');

// Barbarian
var barbarian = {
    units: [
        'core',
        'theme/pathfinder',
        'base',
        'option/build',
        'ancestry/human',
        'class/barbarian',
        'option/permission',
    ],
    // documentColour: '#661b14',
    // accentColour: '#a65e08',
    documentColour: '#264e80',
    accentColour: '#a65e08',
    portrait: 'images/Barbarian - Amiri - Yeti Hide.jpg',
    background: 'images/frost1.jpg',
};

// Wizard
var wizard = {
    units: [
        'core',
        'theme/pathfinder',
        'base',
        'option/build',
        'ancestry/human',
        'background/scholar',
        'class/wizard',
        'option/permission',
        'option/spellbook',
        'feat/wizard/counterspell',
        'feat/wizard/familiar',
        'option/animal-companion',
    ],
    documentColour: '#264e80',
    accentColour: '#a65e08',
    portrait: 'images/wizard-ezren-runes.png',
    background: 'images/paper3.jpg',
};


CharacterSheets.ready(() => {
    fs.writeFile("../units.json", JSON.stringify(CharacterSheets._units, null, 2), err => {});

    log("index", "Building character");
    var character = CharacterSheets(barbarian);
    
    character.ready(() => {
        var document = character.document();
        fs.writeFile('../prototype7.json', JSON.stringify(document, null, 2), err => {});
    
        // waitForData(() => {
            var dist = renderItem(document);
            fs.writeFile('../prototype7.html', dist, (err) => {
                if (!!err)
                    error("index", err);
                log("index", "OK");
            });
        // });
    });
    
})