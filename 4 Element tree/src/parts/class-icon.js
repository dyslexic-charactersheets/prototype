register('class-icon', {
    output: {},
    inline: false,
    inputs: [],
}, args => {
    var cls = elementClass('class-icon', null, args, [ ], [ 'icon' ]);
    return `<div${cls}></div>`;
});