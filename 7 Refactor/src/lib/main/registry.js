'use strict';

CharacterSheets._registry = {};

// CharacterSheets.register = function (element, props) {
//     CharacterSheets._registry[element] = _.defaults(props, {
//         key: '',
//         defaults: {},
//         render: args => '',
//         transform: false,
//     });
// };

CharacterSheets.register = function (element, key, defaults, render = args => '', transform = false) {
    CharacterSheets._registry[element] = { defaults: defaults, key: key, render: render, transform: transform };
};

global.render = function(items) {
    // log("registry", "Render", items);
    var rendered = _.map(items, item => renderItem(item));
    return rendered.join("");
};

CharacterSheets.getRegistry = function() {
    return CharacterSheets._registry;
}

var stack = [];

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

    // log("registry", `renderItem ${item.type}`);
    if (_.has(CharacterSheets._registry, item.type)) {
        var reg = CharacterSheets._registry[item.type];
    
        // registered defaults
        if (_.has(reg, "defaults"))
            item = _.defaults(item, reg.defaults);
        
        stack.push(item.type + ((item.id == null) ? '' : ":"+item.id) + ((item.title == null) ? '' : ':'+item.title));
        var output = reg.render(item);
        stack.pop();
        return output;
    } else {
        if (item.type == 'zone')
            warn("registry", "Unsatisfied zone", item.zone);
        else
            warn("registry", "Unknown element type:", item.type, "at:", stack, item);
        return '';
    }
};

global.registryDump = function () {
    
}
