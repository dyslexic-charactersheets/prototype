register('g', {
    contents: [],
}, args => {
    return `<div class='g'>${render(args.contents)}</div>`;
});