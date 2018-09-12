const fs = require('fs');
// const _ = require('lodash');
const sass = require('node-sass');
const Handlebars = require('handlebars');
const data = require('./data.js');
data.preload();

// Load parts
require('./parts/elements/basic.js');
require('./parts/elements/util.js');
require('./parts/elements/layout.js');
require('./parts/elements/furniture.js');
require('./parts/elements/fields.js');
require('./parts/elements/table.js');

require('./parts/pages/build.js');
require('./parts/pages/cover.js');
require('./parts/pages/core.js');
require('./parts/pages/combat.js');
require('./parts/pages/inventory.js');
require('./parts/pages/rogue.js');

require('./parts/base.js');

// Template tools
Handlebars.registerHelper('dataurl', function (filename) {
	return data.getDataURL(filename, false);
});

Handlebars.registerHelper('dataurlraw', function (filename) {
	return data.getDataURL(filename, true);
});

// Compile the stylesheet
var sassResult = sass.renderSync({
    file: 'src/sass/main.scss',
    outputStyle: 'compressed',
});
// var cssTemplate = Handlebars.compile(sassResult.css);

data.waitForAll(() => {
    var embed = [];
    ['portrait', 'fonts', 'style-pathfinder' ].forEach(mod => {
        var file = 'sass/mod-'+mod+'.scss';
        var source = data.getSource(file);
        var template = Handlebars.compile(source);
        embed.push(template({}));
    });

    var cssContent = sassResult.css + embed.join("\n");

    // Render the character sheet
    var dist = render_character_sheet(cssContent,
        [ 
            render_build_page(), 
            render_cover_page(), 
            render_core_page(),
            render_combat_page(),
        ]
    );

    // Write it
    fs.writeFile('prototype3.html', dist, (err) => {});
});