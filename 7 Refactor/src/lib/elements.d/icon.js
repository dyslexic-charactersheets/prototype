'use strict';

CharacterSheets.register('icon', {
    key: 'icon', 
    defaults: {
        icon: "",
    }, 
    render: args => {
        var cls = elementClass('icon', null, args, [], [ "icon", "size" ]);
        return `<i${cls}></i>`;
    }
});
