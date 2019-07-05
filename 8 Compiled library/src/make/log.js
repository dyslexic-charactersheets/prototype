require('colors');

global.log = function(area, message, ...args) {
    var prefix = `[${area}] `.padEnd(16).cyan;
    console.log(`${prefix}${message}`, ...args);
}

global.warn = function(area, message, ...args) {
    var prefix = `[${area}] `.padEnd(16).yellow;
    console.log(`${prefix}${message}`, ...args);
}

global.error = function(area, message, ...args) {
    var prefix = `[${area}] `.padEnd(16).red.bold;
    console.log(`${prefix}${message}`, ...args);
}