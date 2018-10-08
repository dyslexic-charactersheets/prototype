["h1", "h2", "h3", "h4", "h5", "h6"].forEach(h => {
    register(h, {
        title: "",
    }, args => {
        return `<${h}>${esc(args.title)}</${h}>`;
    })
})