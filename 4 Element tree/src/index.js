const fs = require('fs');

// load files first
require('./lib/data.js');
require('./lib/preload.js');
require('./lib/stylesheet.js');

require('./lib/registry.js');
require('./lib/util.js');
require('./lib/parts.js');

var prototype = JSON.parse(fs.readFileSync('src/prototype.json', 'utf8'));

global.documentColour = '#005080';

waitForData(() => {
    var dist = renderItem(prototype);
    fs.writeFile('prototype4.html', dist, (err) => {});
});