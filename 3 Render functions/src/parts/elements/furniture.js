const _ = require('lodash');

global.render_section = function (title, contents) {
    return `<section>
<h3>${title}</h3>
<div class='g'>
${contents.join("\n")}
</div>
</section>`;
}

global.render_section__untitled = function (contents) {
    return `<section>
<div class='g'>
${contents.join("\n")}
</div>
</section>`;
}

global.render_section__primary = function (title, contents) {
    return `<section class='section--primary'>
<h3>${title}</h3>
<div class='g'>
${contents.join("\n")}
</div>
</section>`;
}

global.render_articles = function(args, num, callback = null, items = []) {
    if (_.isNumber(args)) {
        items = callback;
        callback = num;
        num = args;
        args = {};
    }
    if (_.isNull(items))
        items = [];

    var articles_class = "articles";
    if (_.has(args, "zebra") && args.zebra) articles_class += " articles--zebra";

    if (_.isNull(callback)) callback = n => '';
    
    var articles = [];
    items.forEach(item => articles.push(item));

    var nums = _.isArray(num) ? num : _.range(0, num);
    // console.log(JSON.stringify(nums));
    nums.forEach(i => articles.push(callback(i)));

    if (_.has(args, "split")) {
        var total = articles.length;
        var split = args.split;
        var layout = _.has(args, "layout") ? args.layout : split+"e";
        var chunksize = Math.ceil(parseFloat(total) / parseFloat(split));
        var chunks = [];
        var offset = 0;
        for (var col = 0; col < split; col++) {
            var chunk = articles.slice(offset, offset + chunksize);
            offset += chunksize;
            chunks.push(render_items(chunk));
        }

        if (_.has(args, "cols_callback"))
            chunks = args.cols_callback(chunks);
        return `<div class='${articles_class}'>${render_layout(layout, chunks)}</div>`;
    }
    
    return `<div class='${articles_class}'>
${articles.join("\n")}
</div>`;
}

global.render_article = function (args, contents = []) {
    if (_.isArray(args) && _.isNull(contents)) {
        contents = args;
        args = {};
    }

    var article_class = '';
    if (_.has(args, "inset") && args.inset) article_class += ' article--inset'
    
    var heading = [];
    var dl = '';
    if (_.has(args, "title")) heading.push(`<h5>${args.title}</h5>`);
    if (_.has(args, "edit_title") && args.edit_title) heading.push("<input>");
    if (_.has(args, "icon")) {
        article_class += " article--with-icon";
        heading.push(`<i class='icon icon-${args.icon}'></i>`);
    }
    if (_.has(args, "annotation")) heading.push(`<h6>${args.annotation}</h6>`);
    if (_.has(args, "meta")) {
        dl = ["<dl>"];
        _(args.meta).keys().forEach(key => {
            dl.push(`<dt>${key}</dt><dd>${args.meta[key]}</dd>`);
        });
        dl.push("</dl>");
        dl = dl.join("\n");
    }
    header = _.isEmpty(heading) ? '' : `<header>${heading.join("\n")}</header>`;
    // header = `<header>${heading.join("\n")}</header>`

    article_class = (article_class == '') ? '' : `class='${article_class}'`;
    return `<article ${article_class}>
${header}${dl}
<div class='g'>
${contents.join("\n")}
</div>
</article>`;
}

global.render_logo = function () {
    return "<h1 class='logo'></h1>";
}

global.render_portrait = function () {
    return "<div class='portrait'></div>";
}