var isArray = require('../lib/is-array');
var inArray = require('../lib/in-array');

function match_platform(sysreq, platform, callback) {
    var name = Object.keys(sysreq)[0];
    var platforms = sysreq[name].platforms;
    var type = platforms[platform['name']];
    if (!type) { callback(null); return; }

    if (typeof type === 'string') { callback(null, type); return; }

    if (isArray(type)) {
	return match_array(type, platform, callback);
    } else {
	return match_object(type, platform, callback);
    }
}

function match_array(sysreqs, platform, callback) {
    sysreqs.forEach(function(sr) {
	if (platform['distribution'] === sr['distribution']) {
	    if (!sr['releases'] ||
		inArray(platform['release'], sr['releases'])) {
		callback(null, sr['buildtime']);
		return;
	    }
	}
    })
    callback(null);
}

function match_object(sysreqs, platform, callback) {
    callback(null);
}

module.exports = match_platform;