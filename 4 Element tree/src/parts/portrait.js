register('portrait', {
}, args => {
    var cls = elementClass('portrait', null, args, ['overprint'], []);
    return `<div${cls}></div>`;
});