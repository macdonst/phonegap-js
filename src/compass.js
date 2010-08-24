/*
window.addEventListener("deviceorientation", function(event) {
            // process event.alpha, event.beta and event.gamma
        }, true);

 - only once something is looking for deviceorientation do we start the compass
 - once no more listeners are attached we stop the compass
*/

/**
 * This class provides access to device Compass data.
 * @constructor
 */
function Compass() {
    /**
     * The last known Compass position.
     */
	this.lastHeading = null;
};

/**
 * Asynchronously aquires the current heading.
 * @param {Function} successCallback The function to call when the heading
 * data is available
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the heading data.
 * @param {PositionOptions} options The options for getting the heading data
 * such as timeout.
 */
Compass.prototype.getCurrentHeading = function(successCallback, errorCallback, options) {
    var self = this;
	PhoneGap.exec(function() {
	        self.m_gotHeading(successCallback);
	    }, errorCallback, 'com.phonegap.Compass', 'getCurrentHeading');
};

/**
 * Asynchronously aquires the heading repeatedly at a given interval.
 * @param {Function} successCallback The function to call each time the heading
 * data is available
 * @param {Function} errorCallback The function to call when there is an error 
 * getting the heading data.
 * @param {HeadingOptions} options The options for getting the heading data
 * such as timeout and the frequency of the watch.
 */
Compass.prototype.watchHeading= function(successCallback, errorCallback, options) {
    var frequency = (options != undefined)? options.frequency : 10000;
	var self = this;
	return setInterval(function() {
		self.getCurrentHeading(successCallback, errorCallback, options);
	}, frequency);
};

/**
 * Clears the specified heading watch.
 * @param {String} watchId The ID of the watch returned from #watchHeading.
 */
Compass.prototype.clearWatch = function(watchId) {
    PhoneGap.exec('com.phonegap.Compass', 'clearWatch', [watchId]);
};

/**
 * Called by the compass framework when the current heading is found.
 * @param {HeadingOptions} position The current heading.
 */
Compass.prototype.m_gotHeading = function(args, callback) {
    this.lastHeading = heading;
    callback(this.lastHeading);
};

PhoneGap.addConstructor('compass', new Compass());
