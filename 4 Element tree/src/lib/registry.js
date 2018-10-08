const _ = require('lodash');
var registry = {};

global.register = function (element, defaults, callback) {
    registry[element] = { defaults: defaults, callback: callback };
};

global.render = function(items, context = {}) {
    var rendered = _.map(items, item =>this.renderItem(item, context));
    return rendered.join("");
};

var stack = [];

global.renderItem = function(item, context = {}) {
    var type = item.type;
    if (_.has(registry, type)) {
        var reg = registry[type];

        // item arguments
        var args = _.defaults({}, item);
        args = _.defaults(args, {
            "id": null,
        });

        // apply context stack

        // apply defaults
        args = _.defaults(args, reg.defaults);
        
        stack.push(item.type+":"+args.id);
        var output = reg.callback(args);
        stack.pop();
        return output;
    } else {
        console.log("[registry] Unknown element type:", type, "at:", stack, item);
        return '';
    }
}