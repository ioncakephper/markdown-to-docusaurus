const path = require("path");

module.exports.slug = function(source) {
    return source.trim().toLowerCase().replace(/ +/g, "-");
}

module.exports.setMissingExtension = function(basename, extension) {
    let ext = path.extname(basename);
    if (ext.length == 0)
        return basename.trim() + extension.trim();
    
    return basename.trim();
}