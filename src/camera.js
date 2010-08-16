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
 */
Camera.prototype.getPicture = function(successCallback, errorCallback) {
    var self = this;
    PhoneGap.exec(successCallback, errorCallback, 'com.phonegap.Camera', 'getPicture');
}

PhoneGap.addConstructor(function() { PhoneGap.addExtension('camera', new Camera()); });