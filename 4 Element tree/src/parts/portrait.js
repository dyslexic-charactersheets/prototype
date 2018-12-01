register('portrait', {
}, args => {
    var copyright = "Image &copy; Paizo Publishing";
    var cls = elementClass('portrait', null, args, ['overprint'], []);
    return `<figure${cls}><figcaption>${copyright}</figcaption></figure>`;
});