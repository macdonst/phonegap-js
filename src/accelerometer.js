/*
window.addEventListener("devicemotion", function(event) {
           // Process event.acceleration, event.accelerationIncludingGravity,
           // event.rotationRate and event.interval
       }, true);

 - only once something is looking for devicemotion do we start the accelerometer
 - once no more listeners are attached we stop the accelerometer
*/


function Acceleration(x, y, z)
{
  this.x = x;
  this.y = y;
  this.z = z;
  this.timestamp = new Date().getTime();
}

/**
 * This class provides access to device accelerometer data.
 * @constructor
 */
function Accelerometer() {
	/**
	 * The last known acceleration.
	 */
	this.lastAcceleration = null;
}

/**
 * Asynchronously aquires the current acceleration.
 * @param {Function} successCallback The function to call when the acceleration
 * data is available
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the acceleration data.
 * @param {AccelerationOptions} options The options for getting the accelerometer data
 * such as timeout.
 */
Accelerometer.prototype.getCurrentAcceleration = function(successCallback, errorCallback, options) {
    var self = this;
    return PhoneGap.exec(function(args) {
            self.m_gotAcceleration(successCallback, args);
        }, errorCallback, 'com.phonegap.Accelerometer', 'getCurrentAcceleration');
};

Accelerometer.prototype.m_gotAcceleration = function(callback, args) {
    this.lastAcceleration = new Acceleration(args.x, args.y, args.z, new Date().getTime());
    callback(this.lastAcceleration);
};


/**
 * Asynchronously aquires the acceleration repeatedly at a given interval.
 * @param {Function} successCallback The function to call each time the acceleration
 * data is available
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the acceleration data.
 * @param {AccelerationOptions} options The options for getting the accelerometer data
 * such as timeout.
 */
Accelerometer.prototype.watchAcceleration = function(successCallback, errorCallback, options) {
    if (typeof options == 'undefined') {
        options = {};
    }
    if (typeof options.frequency != 'number') {
        options.frequency = 10000;
    }

    var self = this;
    var watchId = PhoneGap.exec(function(args) {
            self.m_gotAcceleration(successCallback, args);
        }, errorCallback, 'com.phonegap.Accelerometer', 'watchAcceleration');
    return watchId;
};

/**
 * Clears the specified accelerometer watch.
 * @param {String} watchId The ID of the watch returned from #watchAcceleration.
 */
Accelerometer.prototype.clearWatch = function(watchId) {
    PhoneGap.clearWatch('com.phonegap.Accelerometer', watchId);
};

PhoneGap.addConstructor(function() { PhoneGap.addExtension('accelerometer', new Accelerometer()); });
