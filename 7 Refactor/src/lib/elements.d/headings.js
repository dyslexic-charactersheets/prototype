'use strict';

["h1", "h2", "h3", "h4", "h5", "h6"].forEach(h => {
    CharacterSheets.register(h, {
        key: 'title', 
        defaults: {
            title: "",
            align: "",
        }, 
        render: args => {
            var cls = elementClass(h, null, args, [], { 'align': '' });
            return `<${h}${cls}>${esc(args.title)}</${h}>`
        }
    });
});