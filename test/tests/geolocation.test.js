Tests.prototype.GeolocationTests = function() {	
	module('Geolocation (phonegap.geolocation)');
	test('should exist', function() {
  		expect(1);
  		equal(typeof phonegap.geolocation, 'object', 'phonegap.geolocation should be an object.');
	});
	test('should contain a getCurrentPosition function', function() {
  		expect(1);
  		
  		stop();
  		
  		// Android
    	CommandManager = {
    	    exec: function(clazz, action, callbackId, jsonArgsString) {
    	        PhoneGap.callbackSuccess(callbackId, {lat:23});
            }
    	}

    	phonegap.geolocation.getCurrentPosition(function(args) {
    	    equal(args.coords.latitude, 23, 'latitude should be 23');
    	    start();
    	}, function() {}, {});
  	});
	test('should contain a watchPosition function', function() {
  		expect(5);
  		
  		stop();

        // Android
        CommandManager = {
            execWatch: function(clazz, action, callbackId, jsonArgsString) {
                switch (action) {
                    case 'watchPosition':
                        setTimeout(function() {
                                PhoneGap.callbackWatchSuccess(callbackId, {lat:23});
                            }, 100);
                        return 0;
                        break;
                    default:
                }
            }, 
            exec: function(clazz, action, callbackId, jsonArgsString) {
                switch (action) {
                    case 'clearWatch':
                        return 0;
                        break;
                    default:
                }
            }
        };

    	var watchId = phonegap.geolocation.watchPosition(function(args) {
    	    }, function() {}, {frequency: 1000});

        ok(typeof watchId === 'number', 'watchPosition should return a numeric watchId');

    	var watchId2 = phonegap.geolocation.watchPosition(function(args) {
    	    equal(args.coords.latitude, 23, 'latitude should be 23');

            ok(checkGeoWatches(2), 'there should be two watches');

            phonegap.geolocation.clearWatch(watchId);

            ok(checkGeoWatches(1), 'there should be one watch');

            // TODO:  stop should be called at this point

            phonegap.geolocation.clearWatch(watchId2);

            ok(checkGeoWatches(0), 'there should be no watches');

    	    start();
    	}, function() {}, {frequency: 1000});
  	});
}

function checkGeoWatches(expect) {
    var i=0;
    for (var item in PhoneGap.callbacksWatch) {
        i++;
    }
    return (i == expect);
}
