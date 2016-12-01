var resolvePath = function(obj, path){ return (path || "").split('.').filter(Boolean).reduce(function(obj, pathPart){ return obj && obj[pathPart]; }, obj); };
var extendByMapFactory = function(fieldMap) {
    return function (sourceObj, extendWithObj) {
        Object
            .keys(fieldMap)
            .forEach(function (keyName) {
                var path = (fieldMap[keyName] || "").split('.');
                extendWithObj[keyName] && ((resolvePath(sourceObj, path.slice(0, -1).join('.')) || {})[path.slice(-1)[0]] = extendWithObj[keyName]);
            });

        return sourceObj;
    }
};

module.exports = extendByMapFactory;