Tests.prototype.NetworkTests = function() {
    module('Network (phonegap.network)');
    test("should exist", function() {
        expect(1);
        ok(phonegap.network != null, "phonegap.network should not be null.");
    });
    test("should contain an isReachable function", function() {
        expect(1);
        ok(typeof phonegap.network.isReachable == 'function', "phonegap.network.isReachable should be a function.");
    });
    test("should define constants for network status", function() {
        expect(4);
        ok(NetworkStatus != null, "NetworkStatus object exists in global scope.");
        equals(NetworkStatus.NOT_REACHABLE, 0, "NetworkStatus.NOT_REACHABLE is equal to 0.");
        equals(NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK, 1, "NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK is equal to 1.");
        equals(NetworkStatus.REACHABLE_VIA_WIFI_NETWORK, 2, "NetworkStatus.REACHABLE_VIA_WIFI_NETWORK is equal to 2.");
    });
    test("isReachable function should return an object with a 'code' member as a NetworkStatus constant in its success callback", function() {
        expect(1);
        stop();
        
 	   //Android
 	   CommandManager = {
            exec: function(clazz, action, callbackId, jsonArgsString) {
                 switch (action) {
                     case 'isReachable':
                         PhoneGap.callbackSuccess(callbackId, {code:NetworkStatus.NOT_REACHABLE});
                         break;
                     default:
                 }
             }
 	   };

        var hostname = "http://www.google.com";
        var win = function(p) {
            ok(p.code == NetworkStatus.NOT_REACHABLE || p.code == NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK || p.code == NetworkStatus.REACHABLE_VIA_WIFI_NETWORK, "Success callback in isReachable returns a proper object with a 'code' member equal to a NetworkStatus constant.");
            start();
        };
        phonegap.network.isReachable(hostname, win);
    });
};