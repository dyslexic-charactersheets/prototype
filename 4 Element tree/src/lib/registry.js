const _ = require('lodash');
var registry = {};

global.register = function (element, defaults, callback) {
    registry[element] = { defaults: defaults, callback: callback };
};

global.render = function(items) {
    var rendered = _.map(items, item =>this.renderItem(item));
    return rendered.join("");
};

var stack = [];
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
        var match = pair[0].match(rx);
        if (match) {
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

global.renderItem = function(item) {
    var args = registryDefaultArgs(item);
    if (!args.exists || args.exists === "false")
        return '';

    if (_.has(registry, args.type)) {
        var reg = registry[args.type];
        
        contextStack.push(item);
        stack.push(item.type + ((args.id == null) ? '' : ":"+args.id) + ((args.title == null) ? '' : ':'+args.title));
        var output = reg.callback(args);
        stack.pop();
        contextStack.pop();
        return output;
    } else {
        console.log("[registry] Unknown element type:", args.type, "at:", stack, item);
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
