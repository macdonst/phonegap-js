// http://dev.w3.org/geo/api/spec-source.html

function Geolocation() {
    this.lastPosition = null;
};

Geolocation.prototype.getCurrentPosition = function(successCallback, errorCallback, options) {
    options = options || new PositionOptions();
    if (typeof successCallback != 'function') { return; }
    if (this.m_returnCached(options)) {
        successCallback(this.lastPosition);
    } else if (typeof errorCallback == 'function' && options.timeout <= 0) {
        errorCallback(new PositionError(PositionError.TIMEOUT));
    } else {
        var self = this;
        var callbackId = PhoneGap.exec(function(args) {
                self.m_gotPosition(successCallback, args)
            }, errorCallback, 'com.phonegap.Geolocation', 'getCurrentPosition', options);
        return callbackId;
    }
};

Geolocation.prototype.watchPosition = function(successCallback, errorCallback, options) {
    options = options || new PositionOptions();
    if (this.m_returnCached(options)) {
        successCallback(this.lastPosition);
    } else if (typeof errorCallback == 'function' && options.timeout <= 0) {
        errorCallback(new PositionError(PositionError.TIMEOUT));
    } else {
        var self = this;
        var watchId = PhoneGap.execWatch(function(args) {
                self.m_gotPosition(successCallback, args)
            }, errorCallback, 'com.phonegap.Geolocation', 'watchPosition', options);
        return watchId;
    }
};

Geolocation.prototype.clearWatch = function(watchId) {
    PhoneGap.clearWatch('com.phonegap.Geolocation', watchId);
};

Geolocation.prototype.m_gotPosition = function(callback, args) {
    this.lastPosition = new Position(new Coordinates(args.lat, args.lng, args.alt, args.altacc, args.head, args.vel));
    callback(this.lastPosition);
};

/**
 * Checks if the lastPosition is recent enough to return.
 */
Geolocation.prototype.m_returnCached = function(options) {
    return (this.lastPosition != null && options.maximumAge > (new Date().valueOf() - this.lastPosition.timestamp));
};

PhoneGap.addConstructor(function() { PhoneGap.addExtension('geolocation', new Geolocation()); });
