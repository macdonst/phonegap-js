function Geolocation() {
    this.lastPosition = null;
};

Geolocation.prototype.getCurrentPosition = function(successCallback, errorCallback, options) {
    PhoneGap.execAsync(PhoneGap.close(this, this.m_gotPosition, [successCallback]), errorCallback, 'com.phonegap.Geolocation', 'getCurrentPosition');
};

Geolocation.prototype.watchPosition = function(successCallback, errorCallback, options) {
    var frequency = (options != undefined)? options.frequency : 10000;
    // the watch needs to be keyed on the options ... or at least the frequency?
    // when the CommandManager calls back to the callbackSuccess it should not 
    // delete the watch function since it has to be called again
    PhoneGap.execWatch(function(args) {
        this.m_gotPosition(args, successCallback);
    }, errorCallback, 'com.phonegap.Geolocation', 'watchPosition', [frequency]);
};

Geolocation.prototype.clearWatch = function(watchId) {
    PhoneGap.exec('com.phonegap.Geolocation', 'clearWatch', [watchId]);
};

Geolocation.prototype.m_gotPosition = function(args, callback) {
    this.lastPosition = new Position(new Coordinates(args.lat, args.lng, args.alt, args.altacc, args.head, args.vel), new Date().getValue());
    callback(this.lastPosition);
};

PhoneGap.addConstructor('geolocation', new Geolocation());
