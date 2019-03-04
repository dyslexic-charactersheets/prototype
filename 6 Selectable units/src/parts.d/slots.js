const _ = require('lodash');

register('slots', 'slots', {
    slots: [],
    key: 'level',
    placeholder: {},
    max: false,
    min: false,
    contents: [],
}, 
args => '', 
(args, ctx) => {
    console.log("[slots] Slots:", args.slots);
    
    function slotItems(items) {
        console.log("[slots] Items", items);
        if (args.min && items.length < args.min) {
            var n = args.min - items.length;
            for (var i = 0; i < n; i++) 
                items.push(_.cloneDeep(args.placeholder));
        }
        if (args.max && items.length > args.max) {
            items = items.slice(0, args.max);
        }

        return items;
    }

    if (_.isNull(args.slots) || args.slots == []) {
        console.log("[slots] Single slot");
        return slotItems(args.contents);
    }

    var slots = {};
    _.forEach(args.slots, s => {
        slots[s] = {
            key: s,
            contents: []
        };
        slots[s][args.key] = s;
    });
    console.log("[slots] Filled", slots);
    _.forEach(args.contents, item => {
        if (!_.has(item, args.key))
            return;
        if (_.has(slots, item[args.key])) {
            slots[item[args.key]].contents.push(item);
        }
    });
    _.forEach(slots, s => {
        console.log("[slots] Slot", s.key);
        s.contents = slotItems(s.contents);
        s.contents.forEach(item => item[args.key] = s.key)
    });

    console.log("[slots]", slots);
    var contents = _.flatMap(slots, s => s.contents);

    console.log("[slots]", contents);
    return contents;
});