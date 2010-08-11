/**
 * This class provides access to the device camera.
 * @constructor
 */
function Camera() {
	
}

/**
 * 
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * @param {Object} options
 */
Camera.prototype.getPicture = function(successCallback, errorCallback, options) {
    PhoneGap.execAsync(function(args) {
        this.m_gotPicture(args, successCallback);
    }, errorCallback, 'com.phonegap.Camera', 'getPicture');
}

Camera.prototype.m_gotPicture = function(args, callback) {
    callback(args);
}

PhoneGap.addConstructor('camera', new Camera());
