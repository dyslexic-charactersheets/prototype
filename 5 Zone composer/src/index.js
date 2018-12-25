const fs = require('fs');

const zone_composer = require('./lib/zone-composer2.js');

// Base document
var doc = zone_composer({
    type: "doc",
    title: "Prototype 4",
    contents: [
        {
            type: "zone",
            zone: "@pages"
        }
    ]
});

doc.addAt('@pages', {
    type: "page",
    id: "test",
    contents: [
        {
            type: "section",
            title: "Zone One",
            contents: [
                {
                    type: "p",
                    content: "Foo"
                },
                {
                    type: "zone",
                    zone: "@one"
                },
                {
                    type: "p",
                    content: "Bar"
                },
            ]
        },
        {
            type: "section",
            title: "Zone Two",
            contents: [
                {
                    type: "zone",
                    zone: "@two"
                },
            ]
        }
    ]
});


doc.addAt('@one', {
    type: "p",
    content: "Lorem ipsum dolor sit amet consequetur adipiscing elit."
});

doc.addAt('@two_inside', {
    type: "p",
    level: 2,
    content: "Before"
});

doc.addAt('@two', {
    type: "g",
    contents: [
        {
            type: "zone",
            zone: "@two_inside"
        }
    ]
});

doc.addAt('@two_inside', {
    type: "p",
    content: "After"
});

var document = doc.document();

console.log("Document:", JSON.stringify(document, null, 2));