const _ = require('lodash');

register('zone', 'zone', {
    zone: '',
    sort: false,
}, args => '', (args, ctx) => {
    console.log("[zone] Injecting", args.zone);
    var existing = _.has(args, "contents") && args.contents ? args.contents : [];
    var insert = _.has(ctx.zones, args.zone) ? _.cloneDeep(ctx.zones[args.zone]) : [];

    var contents = existing.concat(insert);
    console.log("[zone] Contents", contents);

    // sort the contents
    if (args.sort) {
        console.log("[zone] Sorting");
        var contents = contents.map(subelement => _.defaults(subelement, { level: 1, order: 1 }));
        contents = contents.sort((a, b) => {
            if (a.level != b.level)
                return a.level - b.level;
            if (a.order != b.order)
                return a.order - b.order;
            if (a.primary && !b.primary)
                return -1;
            if (b.primary && !a.primary)
                return 1;
            return 0;
        });
    }

    return contents;
});