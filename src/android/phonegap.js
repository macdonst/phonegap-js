/**
 * This represents the PhoneGap API itself, and provides a global namespace for accessing
 * information about the state of PhoneGap.
 * @class
 */
var phonegap = { };

PhoneGap.desktop = false;


PhoneGap.watchId = 0;
PhoneGap.callbackId = 0;
PhoneGap.callbacks = {};
PhoneGap.callbacksWatch = {};

/**
 * Exec is always async since not all platforms can get back immediate return values.
 * This will return a value on platforms that support it.
 */
PhoneGap.exec = function(success, fail, clazz, action, args) {
    var callbackId = clazz + PhoneGap.callbackId++;
	PhoneGap.callbacks[callbackId] = {success:success, fail:fail};
	return CommandManager.exec(clazz, action, callbackId, JSON.stringify(args));
};

PhoneGap.callbackSuccess = function(callbackId, args) {
	PhoneGap.callbacks[callbackId].success(args);
	PhoneGap.clearExec(callbackId);
};

PhoneGap.callbackError = function(callbackId, args) {
	PhoneGap.callbacks[callbackId].fail(args);
	PhoneGap.clearExec(callbackId);
};

PhoneGap.clearExec = function(callbackId) {
    delete PhoneGap.callbacks[callbackId];
};


PhoneGap.execSync = function(clazz, action, args) {
	return CommandManager.exec(clazz, action, null, JSON.stringify(args));
};

/* Executing watches is a bit different */


PhoneGap.execWatch = function(success, fail, clazz, action, args) {
	var watchId = PhoneGap.watchId++;
	PhoneGap.callbacksWatch[watchId] = {success:success, fail:fail};
	var error = CommandManager.execWatch(clazz, action, watchId, JSON.stringify(args));
	if (error != '0') {
	    throw error;
	}
	return watchId;
};

PhoneGap.clearWatch = function(clazz, watchId) {
    delete PhoneGap.callbacksWatch[watchId];
    var error = CommandManager.exec(clazz, 'clearWatch', null, JSON.stringify( { watchId: watchId } ) );
    if (error != '0') {
        throw error;
    }
};

PhoneGap.callbackWatchSuccess = function(watchId, args) {
    PhoneGap.callbacksWatch[watchId].success(args);
};