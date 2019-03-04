register('hr', '', {
    swash: false,
}, args => {
    var cls = elementClass('hr', null, args, [ 'swash' ]);
    var i = args.swash ? '<i></i>' : '';
    return `<hr${cls}>${i}`;
});