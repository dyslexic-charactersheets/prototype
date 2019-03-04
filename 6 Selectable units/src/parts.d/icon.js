register('icon', 'icon', {
    icon: "",
}, args => {
    var cls = elementClass('icon', null, args, [], [ "icon", "size" ]);
    return `<i${cls}></i>`;
})