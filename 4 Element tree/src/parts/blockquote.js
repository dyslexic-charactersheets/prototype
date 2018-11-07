register('blockquote', {}, args => {
    return `<blockquote>${render(args.contents)}</blockquote>`;
});