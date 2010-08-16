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
	this.watchList = {};
    this.lastWatchId = 0;
}

Accelerometer.status = {
    RUNNING: 0,
    STOPPED: 1
};

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
    PhoneGap.exec(function(args) {
            self.m_gotAcceleration(successCallback, args);
        }, errorCallback, 'com.phonegap.Accelerometer', 'getCurrentAcceleration');
};

Accelerometer.prototype.m_setupWatch = function(successCallback, errorCallback, options, watchId, args) {
    var x = setInterval(PhoneGap.close(this, this.getCurrentAcceleration, [successCallback, errorCallback, options]), options.frequency);
    this.watchList[watchId] = x;
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
    
    var watchId = this.lastWatchId++;

    // Check if the GPS is already running
    PhoneGap.exec(PhoneGap.close(this, function(args) { // Success
        if (args.status == Accelerometer.status.RUNNING) {
            this.m_setupWatch(successCallback, errorCallback, options, watchId);
        } else {
            // Start it - on successful start then call m_doWatch to setup the interval
            PhoneGap.exec(PhoneGap.close(this, this.m_setupWatch, [successCallback, errorCallback, options, watchId]), errorCallback, 'com.phonegap.Accelerometer', 'start');
        }
    }), errorCallback, 'com.phonegap.Accelerometer', 'status');
    
    return watchId;
};

/**
 * Clears the specified accelerometer watch.
 * @param {String} watchId The ID of the watch returned from #watchAcceleration.
 */
Accelerometer.prototype.clearWatch = function(watchId) {
    clearInterval(this.watchList[watchId]);
    delete this.watchList[watchId];
    var empty = true;
    for (var item in this.watchList) {
        if (this.watchList.hasOwnProperty(item)) {
            emtpy = false;
            break;
        }
    }
    if (empty) {
        PhoneGap.exec(function() {}, function() {}, 'com.phonegap.Accelerometer', 'stop')
    }
};

PhoneGap.addConstructor(function() { PhoneGap.addExtension('accelerometer', new Accelerometer()); });
