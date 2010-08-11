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
    PhoneGap.exec(function(args) {
        this.m_gotAcceleration(args, successCallback);
    }, errorCallback, 'com.phonegap.Accelerometer', 'getCurrentAcceleration');
};


Accelerometer.prototype.m_gotAcceleration = function(args, callback) {
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
    var frequency = (options != undefined)? options.frequency : 10000;
    PhoneGap.execWatch(function(args) {
        this.m_gotAcceleration(args, successCallback);
    }, errorCallback, 'com.phonegap.Accelerometer', 'watchAcceleration', [frequency]);
};

/**
 * Clears the specified accelerometer watch.
 * @param {String} watchId The ID of the watch returned from #watchAcceleration.
 */
Accelerometer.prototype.clearWatch = function(watchId) {
    PhoneGap.exec('com.phonegap.Accelerometer', 'clearWatch', [watchId]);
};

PhoneGap.addConstructor('accelerometer', new Accelerometer());
