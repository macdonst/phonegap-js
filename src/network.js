
// http://www.w3.org/TR/2010/WD-system-info-api-20100202/#network

/**
 * This class contains information about any NetworkStatus.
 * @constructor
 */
function NetworkStatus() {
	this.code = null;
	this.message = "";
}
NetworkStatus.NOT_REACHABLE = 0;
NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK = 1;
NetworkStatus.REACHABLE_VIA_WIFI_NETWORK = 2;

/**
 * This class provides access to device Network data (reachability).
 * @constructor
 */
function Network() {
    /**
     * The last known Network status.
	 * { hostName: string, ipAddress: string, 
		remoteHostStatus: int(0/1/2), internetConnectionStatus: int(0/1/2), localWiFiConnectionStatus: int (0/2) }
     */
	this.lastReachability = null;
};

/**
 * Called by the geolocation framework when the reachability status has changed.
 * @param {Reachibility} reachability The current reachability status.
 */
Network.prototype.m_gotReachability = function(callback, args) {
    // args should be of type NetworkStatus
    this.lastReachability = args;
    callback(this.lastReachability);
};

/**
 * 
 * @param {Object} uri
 * @param {Function} win
 * @param {Object} options  (isIpAddress:boolean)
 */
Network.prototype.isReachable = function(uri, win, options) {
    var self = this;
    PhoneGap.exec(function(args) {
            self.m_gotReachability(win, args);
        }, function() {}, 'com.phonegap.Network', 'isReachable', options);
};

PhoneGap.addConstructor(function() { PhoneGap.addExtension('network', new Network()); });
