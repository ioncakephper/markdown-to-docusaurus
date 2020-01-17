const path = require("path");
<<<<<<< HEAD

module.exports.slug = function(source) {
    return source.trim().toLowerCase().replace(/ +/g, "-");
=======
module.exports.slug = function(source) {
    source = source.replace(/[~`!#@$%^&*()_\-\+\=\{\[\}\]\|\\:;\"\'\<\,\>\.\?\/]+\b/, "").trim();
    source = source.replace(/\b[~`!#@$%^&*()_\-\+\=\{\[\}\]\|\\:;\"\'\<\,\>\.\?\/]+/, "").trim();
    return source.trim().toLowerCase().replace(/[ ~`!#@$%^&*()_\-\+\=\{\[\}\]\|\\:;\"\'\<\,\>\.\?\/]+/g, "-");
>>>>>>> f0375b578d4cfea56257eca4ef2e50b6f8813af8
}

module.exports.setMissingExtension = function(basename, extension) {
    let ext = path.extname(basename);
<<<<<<< HEAD
    if (ext.length == 0)
        return basename.trim() + extension.trim();
    
=======
    if (ext.length == 0) {
        return basename.trim() + extension.trim();
    }
>>>>>>> f0375b578d4cfea56257eca4ef2e50b6f8813af8
    return basename.trim();
}