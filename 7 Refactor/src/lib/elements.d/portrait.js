CharacterSheets.register('portrait', '', {
    overprint: false,
    'animal-companion': false,
}, args => {
    var copyright = "Image &copy; Paizo Publishing";
    var cls = elementClass('portrait', null, args, ['overprint', 'animal-companion'], []);
    return `<figure${cls}><div class='portrait__inner'></div><figcaption>${copyright}</figcaption></figure>`;
});