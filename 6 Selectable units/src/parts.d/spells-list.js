const _ = require('lodash');

register('spells-list', '', {
    min: 1,
    max: 9,
    spells: 4,
    daily: false,
}, args => {
    var min = args.min;
    var max = args.max;

    // number of spells at each level
    var slots = {};
    if (_.isArray(args.spells)) {
        var i = 0;
        for (var lvl = min; lvl <= max; lvl++) {
            slots[lvl] = args.spells[i];
        }
    } else {
        for (var lvl = min; lvl <= max; lvl++) {
            slots[lvl] = args.spells;
        }
    }

    // objects to render
    var spell_levels = [];
    for (var lvl = min; lvl <= max; lvl++) {
        var level_marker = {
            type: "level-marker",
            level: lvl,
        };
        
        // daily spells?

        // number of spells
        var left = [];
        var right = [];
        var n = Math.ceil(slots[lvl] / 2.0);
        for (var i = 0; i < n; i++) {
            left.push({
                type: "field",
                frame: "none",
                width: "stretch",
            });
            right.push({
                type: "field",
                frame: "none",
                width: "stretch",
            });
        }

        // special fields?
        // ?

        // full level
        spell_levels.push({
            type: "layout",
            layout: "spells-list",
            narrow: true,
            contents: [
                {
                    type: "list",
                    collapse: true,
                    "merge-bottom": true,
                    contents: left
                },
                level_marker,
                {
                    type: "list",
                    collapse: true,
                    "merge-bottom": true,
                    contents: right
                }
            ]
        });
    }
    
    return render([
        {
            type: "list",
            hr: true,
            zebra: true,
            'avoid-shade': true,
            contents: spell_levels
        }
    ]);
});