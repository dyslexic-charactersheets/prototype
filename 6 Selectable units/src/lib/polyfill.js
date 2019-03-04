if (!Array.prototype.hasOwnProperty('flatMap')) {
    const flatMap = require('array.prototype.flatmap');
    delete Array.prototype.flatMap;
    flatMap.shim();
}