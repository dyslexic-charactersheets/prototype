// const _ = require('lodash');

CharacterSheets.register('slots', 'slots', {
    slots: [],
    key: 'level',
    placeholder: null,
    max: false,
    min: false,
    contents: [],
}, 
args => '', 
(args, ctx) => {
    // log("slots", "Slots:", args.slots);
    var placeholder = args.placeholder;
    if (!_.isArray(placeholder))
        placeholder = [ placeholder ];
    
    function slotItems(items) {
        // log("slots", "Items", items);
        if (args.min && items.length < args.min) {
            var n = args.min - items.length;
            for (var i = 0; i < n; i++) {
                // console.log("[slots] Placeholder", args.placeholder);
                items = items.concat(_.cloneDeep(args.placeholder));
            }
        }
        if (args.max && items.length > args.max) {
            items = items.slice(0, args.max);
        }

        return items;
    }

    if (_.isNull(args.slots) || args.slots == []) {
        // console.log("[slots] Single slot");
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
    // console.log("[slots] Filled", slots);
    _.forEach(args.contents, item => {
        if (!_.has(item, args.key))
            return;
        if (_.has(slots, item[args.key])) {
            slots[item[args.key]].contents.push(item);
        }
    });
    _.forEach(slots, s => {
        // console.log("[slots] Slot", s.key);
        s.contents = slotItems(s.contents);
        s.contents.forEach(item => item[args.key] = s.key);
        // console.log("[slots] Slot", s.key, "items", s.contents);
    });

    // log("slots", "Slots:", slots);
    var contents = _.flatMap(slots, s => s.contents);

    // console.log("[slots]", contents);
    return contents;
});