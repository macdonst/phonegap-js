/**
 * This class contains position information.
 * @param {Object} lat
 * @param {Object} lng
 * @param {Object} acc
 * @param {Object} alt
 * @param {Object} altacc
 * @param {Object} head
 * @param {Object} vel
 * @constructor
 */
function Position(coords, timestamp) {
    this.coords = coords;
    this.timestamp = timestamp || new Date().valueOf();
}

function Coordinates(lat, lng, alt, acc, head, vel) {
	/**
	 * The latitude of the position.
	 */
	this.latitude = lat || 0;
	/**
	 * The longitude of the position,
	 */
	this.longitude = lng || 0;
	/**
	 * The accuracy of the position.
	 */
	this.accuracy = acc || 0;
	/**
	 * The altitude of the position.
	 */
	this.altitude = alt || 0;
	/**
	 * The direction the device is moving at the position.
	 */
	this.heading = head || 0;
	/**
	 * The velocity with which the device is moving at the position.
	 */
	this.speed = vel || 0;
}

/**
 * This class specifies the options for requesting position data.
 * @constructor
 */
function PositionOptions(highAccuracy, timeout, maxAge, minAccuracy) {
	/**
	 * Specifies the desired position accuracy.
	 */
	this.enableHighAccuracy = highAccuracy || false;
	/**
	 * The timeout after which if position data cannot be obtained the errorCallback
	 * is called.
	 */
	this.timeout = timeout || 10000000;
	/**
	 * The maximum age in milliseconds of a cached position. If 0 then a cached position
	 * will never be used.
	 */
	this.maximumAge = maxAge || 0;
	/**
	 * PhoneGap specific option to force the GPS to wait until a desired level of accuracy is achieved.
	 */
	this.minimumAccuracy = minAccuracy || 10000000;
	
	// iOS 2+ http://developer.apple.com/iphone/library/documentation/CoreLocation/Reference/CLLocationManager_Class/CLLocationManager/CLLocationManager.html
	// distanceFilter
	// desiredAccuracy
	// Android 1+ http://developer.android.com/reference/android/location/LocationManager.html#requestLocationUpdates(java.lang.String, long, float, android.location.LocationListener)
	// minTime
	// minDistance
	// BlackBerry 4+ http://www.blackberry.com/developers/docs/4.0.2api/javax/microedition/location/LocationProvider.html
	// interval
	// timeout
	// maxAge
}

/**
 * This class contains information about any GSP errors.
 * @constructor
 */
function PositionError(code, message) {
	this.code = code || PositionError.UNKNOWN_ERROR;
	this.message = message || '';
}

PositionError.UNKNOWN_ERROR = 0;
PositionError.PERMISSION_DENIED = 1;
PositionError.POSITION_UNAVAILABLE = 2;
PositionError.TIMEOUT = 3;
