'use strict';

CharacterSheets.register('paste', {
    key: 'template',
    defaults: {
        params: {}
    }, 
    render: args => ''
});

CharacterSheets.register('define', {
    key: 'template', 
    defaults: {
        template: '',
        params: {},
        contents: [],
    }, 
    render: args => ''
});