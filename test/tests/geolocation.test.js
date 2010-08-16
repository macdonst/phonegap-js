Tests.prototype.GeolocationTests = function() {	
	module('Geolocation');
	test('should exist', function() {
  		expect(1);
  		equal(typeof phonegap.geolocation, 'object', 'phonegap.geolocation should be an object.');
	});
	test('should define constants for GPS status', function() {
  		expect(3);
  		equal(typeof Geolocation.status, 'object', 'Geolocation.status should be an object.');
  		equal(Geolocation.status.RUNNING, 0, 'Geolocation.status.RUNNING should be 0.');
  		equal(Geolocation.status.STOPPED, 1, 'Geolocation.status.STOPPED should be 1.');
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
            exec: function(clazz, action, callbackId, jsonArgsString) {
                switch (action) {
                    case 'status':
                        PhoneGap.callbackSuccess(callbackId, {status:0});
                        break;
                    case 'getCurrentPosition':
                        PhoneGap.callbackSuccess(callbackId, {lat:23});
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

            equal(typeof phonegap.geolocation.watchList[watchId2], 'number');

            // TODO:  stop should be called at this point

            phonegap.geolocation.clearWatch(watchId2);

    	    start();
    	}, function() {}, {frequency: 1000});
  	});
	test('should start the GPS if the status is 1', function() {
  		expect(2);

  		stop();

  		ok(checkGeoWatches(0), 'there should be no watches');

  		// Android
        CommandManager = {
            exec: function(clazz, action, callbackId, jsonArgsString) {
                switch (action) {
                    case 'start':
                        PhoneGap.callbackSuccess(callbackId, {status:0});
                        break;
                    case 'stop':
                        break;
                    case 'status':
                        PhoneGap.callbackSuccess(callbackId, {status:1});
                        break;
                    case 'getCurrentPosition':
                        PhoneGap.callbackSuccess(callbackId, {lat:23});
                        break;
                    default:
                }
            }
        };

    	var watchId = phonegap.geolocation.watchPosition(function(args) {
    	    equal(args.coords.latitude, 23, 'latitude should be 23');
    	    start();
    	}, function() {}, {frequency: 1000});
  	});
}

function checkGeoWatches(expect) {
    var watches = 0;
    for (var item in phonegap.geolocation.watchList) {
        watches++;
    }
    return (watches == expect);
}
