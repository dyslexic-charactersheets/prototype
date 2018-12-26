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

doc.addAt('@pages', [
    {
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
                    }
                ]
            },
            {
                type: "section",
                title: "Zone Two",
                contents: [
                    {
                        type: "zone",
                        zone: "@two"
                    }
                ]
            },
            {
                type: "section",
                title: "Zone Three",
                contents: [
                    {
                        type: "zone",
                        zone: "@three",
                        max: 5,
                        placeholder: {
                            type: "p",
                            content: "Placeholder"
                        }
                    }
                ]
            },
            {
                type: "section",
                title: "Zone Four",
                contents: [
                    {
                        type: "zone",
                        zone: "@four",
                        max: 2,
                        overfill: false
                    }
                ]
            }
        ]
    }
]);

// Test 1: Add to a zone
doc.addAt('@one', [
    {
        type: "p",
        content: "Lorem ipsum dolor sit amet consequetur adipiscing elit."
    }
]);

// Test 2: Add to a sub-zone; order by level
doc.addAt('@two_inside', [
    {
        type: "p",
        level: 2,
        content: "Two"
    }
]);

doc.addAt('@two', [
    {
        type: "g",
        contents: [
            {
                type: "zone",
                zone: "@two_inside"
            }
        ]
    }
]);

doc.addAt('@two_inside', [
    {
        type: "p",
        content: "One"
    },
    {
        type: "p",
        level: 3,
        content: "Three"
    }
]);

// Test 3: Placeholders and padding
doc.addAt('@three', [
    {
        type: "p",
        content: "One"
    },
    {
        type: "p",
        content: "Two"
    },
    {
        type: "p",
        content: "Three"
    }
]);

// Test 4: max items
doc.addAt('@four', [
    {
        type: "p",
        content: "One"
    },
    {
        type: "p",
        content: "Two"
    },
    {
        type: "p",
        content: "Three"
    }
]);

var document = doc.document();

console.log("Document:", JSON.stringify(document, null, 2));