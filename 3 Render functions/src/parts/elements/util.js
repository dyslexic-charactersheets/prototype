global.render_items = function(items) {
    return items.join("\n");
}

global.render_spacer = function() {
    return "<div class='spacer'></div>";
}

global.render_g = function(contents) {
    return `<div class='g'>${contents.join("\n")}</div>`;
}

global.left = "left";
global.right = "right";
global.double = 2;
global.triple = 3;

global.repeat_item = function (num, item) {
    return Array(num).fill(item);
}