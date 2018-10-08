register('row', {
    contents: [],
}, args => {
    return `<div class='row'>${render(args.contents)}</div>`;
});