const _ = require('lodash');
var registry = {};

global.register = function (element, key, defaults, render = args => '', transform = false) {
    registry[element] = { defaults: defaults, key: key, render: render, transform: transform };
};

global.render = function(items) {
    var rendered = _.map(items, item =>this.renderItem(item));
    return rendered.join("");
};

global.getRegistry = function() {
    return registry;
}

var stack = [];

/*
var contextStack = [];

global.registryDefaultArgs = function(args) {
    if (_.isNull(args)) {
        return {};
    }

    // basic defaults
    args = _.defaults({}, args);
    args = _.defaults(args, {
        id: null,
        exists: true,
    });
    
    // apply context stack
    var context = {};
    for (var i = contextStack.length - 1; i >= 0; i--) {
        context = _.defaults(context, contextStack[i]);
    }
    var rx = new RegExp('^'+args.type+'_(.*)$', '');
    var contextArgs = _(context).toPairs().flatMap(pair => {
        // console.log(`[registry] Is this a context rule? ${pair[0]}`);
        var match = pair[0].match(rx);
        if (match) {
            // console.log(`[registy] Applying context rule ${pair[0]}`);
            return [[match[1], pair[1]]];
        }
        return [];
    }).fromPairs().value();
    
    args = _.defaults(args, contextArgs);
    args.context = context;

    // registered defaults
    if (_.has(registry, args.type)) {
        var reg = registry[args.type];
        args = _.defaults(args, reg.defaults);
    }

    return args;
};
*/

global.renderItem = function(item) {
    if (_.isNull(item)) return '';
    item = _.defaults(item, {
        id: null,
        exists: true,
    });

    if (!item.exists || item.exists === "false")
        return '';

    if (item.type == "unit")
        item.type = item["unit-type"];

        // console.log(`[registry] renderItem ${item.type}`);
    if (_.has(registry, item.type)) {
        var reg = registry[item.type];
    
        // registered defaults
        if (_.has(registry, item.type))
            item = _.defaults(item, reg.defaults);
        
        stack.push(item.type + ((item.id == null) ? '' : ":"+item.id) + ((item.title == null) ? '' : ':'+item.title));
        var output = reg.render(item);
        stack.pop();
        return output;
    } else {
        if (item.type == 'zone')
            console.log("[registry] Unsatisfied zone", item.zone);
        else
            console.log("[registry] Unknown element type:", item.type, "at:", stack, item);
        return '';
    }










    /*
    if (_.isNull(item)) {
        return '';
    }
    var type = item.type;
    if (_.has(registry, type)) {
        var reg = registry[type];

        // item arguments
        var args = _.defaults({}, item);
        args = _.defaults(args, {
            id: null,
            exists: true,
        });

        // apply context stack
        var context = {};
        for (var i = contextStack.length - 1; i >= 0; i--) {
            context = _.defaults(context, contextStack[i]);
        }
        // console.log("Context:", context);

        var rx = new RegExp('^'+type+'_(.*)$', '');
        var contextArgs = _(context).toPairs().flatMap(pair => {
            var match = pair[0].match(rx);
            if (match) {
                return [[match[1], pair[1]]];
            }
            return [];
        }).fromPairs().value();
        // console.log("Context args:", contextArgs);

        args = _.defaults(args, contextArgs);
        args.context = context;

        // apply defaults
        args = _.defaults(args, reg.defaults);
        args = _.defaults(args, { exists: true });

        if (!args.exists || args.exists === "false")
            return '';

        contextStack.push(item);
        stack.push(item.type + ((args.id == null) ? '' : ":"+args.id) + ((args.title == null) ? '' : ':'+args.title));
        var output = reg.callback(args);
        stack.pop();
        contextStack.pop();
        return output;
    } else {
        console.log("[registry] Unknown element type:", type, "at:", stack, item);
        return '';
    }
    */
};

global.registryDump = function () {
    
}
