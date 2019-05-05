["h1", "h2", "h3", "h4", "h5", "h6"].forEach(h => {
    CharacterSheets.register(h, 'title', {
        title: "",
    }, args => {
        return `<${h}>${esc(args.title)}</${h}>`;
    })
})