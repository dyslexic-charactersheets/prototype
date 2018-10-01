const _ = require('lodash');

global.render_spells_table = function(args) {
    var fixed_items = [];
    if (_.has(args, "fixes_items")) fixed_items = args.fixed_items;

    var max = _.has(args, "max") ? parseInt(args.max) : 4;
    var colmax = Math.ceil(max / 2.0);
    var col = repeat_item(colmax, render_field({
        unlabelled: true,
        wide: true,
        align: left,
    })).join("\n");

    if (_.has(args, "unlevelled") && args.unlevelled) {
        return `<div class='spells spells--cantrips'>
            <div class='spells__level'><div class='layout layout-2e'>
            <div class='spells__col'>${col}</div>
            <div class='spells__col'>${col}</div>
        </div></div>
        </div>`;
    }

    var levels = _.has(args, "levels") ? args.levels : '';
    var bounds;
    if (bounds = levels.match(/([0-9])-([0-9])/)) {
        var min_level = parseInt(bounds[1]);
        var max_level = parseInt(bounds[2]);
        levels = _.range(min_level, max_level + 1);
    } else {
        levels = levels.split(/,/);
    }

    var level_blocks = levels.map(level => {
        var max = _.has(args, "max") ? parseInt(args.max) : 4;
        var colmax = Math.ceil(max / 2.0);
        var col = repeat_item(colmax, render_field({
            unlabelled: true,
            wide: true,
            align: left,
        })).join("\n");

        var level_marker = render_level_marker(level);
        return `<div class='spells__level'><div class='layout layout-spells-list'>
            <div class='spells__col'>${col}</div>
            <div class='spells__level-marker'>${level_marker}</div>
            <div class='spells__col'>${col}</div>
        </div></div>`;
    });

    return `<div class='spells'>
        ${level_blocks.join("\n")}
    </div>`;
};

global.render_feats_table = function(args) {
    var max = _.has(args, "max") ? parseInt(args.max) : 1;
    var levels =_.has(args, "levels") ? args.levels : _.repeat('', max);
    var rows = _.has(args, "rows") ? args.rows : 2;

    return render_articles({
        split: 2,
        zebra: true,
    }, args.max, n => {
        var level = levels[n];
        return render_article({
            level: level,
            edit_title: true,
            icon: "action-template",
        }, [
            render_field({
                wide: true,
                rows: rows,
                align: left,
                unlabelled: true,
            })
        ]);
    });
};