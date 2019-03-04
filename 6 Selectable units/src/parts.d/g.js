register('g', 'contents', {
    contents: [],
}, args => {
    return `<div class='g'>${render(args.contents)}</div>`;
});