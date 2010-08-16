// http://dev.w3.org/geo/api/spec-source.html

function Geolocation() {
    this.lastPosition = null;
    this.watchList = {};
    this.lastWatchId = 0;
};

Geolocation.status = {
    RUNNING: 0,
    STOPPED: 1
};

Geolocation.prototype.getCurrentPosition = function(successCallback, errorCallback, options) {
    options = options || new PositionOptions();
    if (typeof successCallback != 'function') { return; }
    if (this.m_returnCached(options)) {
        successCallback(this.lastPosition);
    } else if (options.timeout <= 0)
        errorCallback(new PositionError(PositionError.TIMEOUT));
    } else {
        var self = this;
        var callbackId = PhoneGap.exec(function(args) {
                self.m_gotPosition(successCallback, args)
            }, errorCallback, 'com.phonegap.Geolocation', 'getCurrentPosition', options);
        setTimeout(function() { 
                self.m_timeoutPosition(errorCallback, callbackId);
            }, options.timeout);
        return callbackId;
    }
};

Geolocation.prototype.watchPosition = function(successCallback, errorCallback, options) {
    options = options || new PositionOptions();

    if (this.m_returnCached(options)) {
        successCallback(this.lastPosition);
    }

    var watchId = this.lastWatchId++;

    // Check if the GPS is already running
    PhoneGap.exec(PhoneGap.close(this, function(args) { // Success
        if (args.status == Geolocation.status.RUNNING) {
            this.m_setupWatch(successCallback, errorCallback, options, watchId);
        } else {
            // Start it - on successful start then call m_doWatch to setup the interval
            PhoneGap.exec(PhoneGap.close(this, this.m_setupWatch, [successCallback, errorCallback, options, watchId]), errorCallback, 'com.phonegap.Geolocation', 'start');
        }
    }), errorCallback, 'com.phonegap.Geolocation', 'status');
    
    return watchId;
};

Geolocation.prototype.clearWatch = function(watchId) {
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
        PhoneGap.exec(function() {}, function() {}, 'com.phonegap.Geolocation', 'stop')
    }
};

Geolocation.prototype.m_setupWatch = function(successCallback, errorCallback, options, watchId, args) {
    var x = setInterval(PhoneGap.close(this, this.getCurrentPosition, [successCallback, errorCallback, options]), options.frequency);
    this.watchList[watchId] = x;
};

Geolocation.prototype.m_gotPosition = function(callback, args) {
    this.lastPosition = new Position(new Coordinates(args.lat, args.lng, args.alt, args.altacc, args.head, args.vel));
    callback(this.lastPosition);
};

Geolocation.prototype.m_timeoutPosition = function(callback, callbackId) {
    PhoneGap.clearCallback(callbackId);
    callback(new PositionError(PositionError.TIMEOUT));
};

/**
 * Checks if the lastPosition is recent enough to return.
 */
Geolocation.prototype.m_returnCached = function(options) {
    return (this.lastPosition != null && options.maximumAge > (new Date().valueOf() - this.lastPosition.timestamp));
};

PhoneGap.addConstructor(function() { PhoneGap.addExtension('geolocation', new Geolocation()); });
