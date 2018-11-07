register('hr', {
    swash: false,
}, args => {
    var cls = elementClass('hr', null, args, [ 'swash' ]);
    return `<hr${cls}>`;
});