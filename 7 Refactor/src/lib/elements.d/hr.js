CharacterSheets.register('hr', '', {
    swash: false,
}, args => {
    var cls = elementClass('hr', null, args, [ 'swash' ]);
    var i = args.swash ? '<i></i>' : '';
    return `<hr${cls}>${i}`;
});

CharacterSheets.register('tail', '', {
}, args => {
    args.tail = true;
    var cls = elementClass('hr', null, args, [ 'tail' ]);
    // var i = args.swash ? '<i></i>' : '';
    return `<hr${cls}>`;
})