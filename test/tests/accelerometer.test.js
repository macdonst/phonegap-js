Tests.prototype.AccelerometerTests = function() {	
	module('Accelerometer');
	test('should exist', function() {
  		expect(1);
  		equal(typeof phonegap.accelerometer, 'object', 'phonegap.accelerometer should not be null.');
	});
	test('should define constants for Accelerometer status', function() {
  		expect(3);
  		equal(typeof Accelerometer.status, 'object', 'Accelerometer.status should be an object.');
  		equal(Accelerometer.status.RUNNING, 0, 'Accelerometer.status.RUNNING should be 0.');
  		equal(Accelerometer.status.STOPPED, 1, 'Accelerometer.status.STOPPED should be 1.');
	});
	test('should contain a getCurrentAcceleration function', function() {
  		expect(1);
  		
  		stop();
  		
  		// Android
    	CommandManager = {
    	    exec: function(clazz, action, callbackId, jsonArgsString) {
    	        PhoneGap.callbackSuccess(callbackId, {x:23});
            }
    	}

    	phonegap.accelerometer.getCurrentAcceleration(function(args) {
    	    equal(args.x, 23, 'x should be 23');
    	    start();
    	}, function() {}, {});
  	});
	test('should contain a watchAcceleration function', function() {
  		expect(5);

  		stop();

        // Android
        CommandManager = {
            exec: function(clazz, action, callbackId, jsonArgsString) {
                switch (action) {
                    case 'status':
                        PhoneGap.callbackSuccess(callbackId, {status:0});
                        break;
                    case 'getCurrentAcceleration':
                        PhoneGap.callbackSuccess(callbackId, {x:23});
                        break;
                    default:
                }
            }
        };

    	var watchId = phonegap.accelerometer.watchAcceleration(function(args) {
    	    }, function() {}, {frequency: 1000});

        ok(typeof watchId === 'number', 'watchAcceleration should return a numeric watchId');

    	var watchId2 = phonegap.accelerometer.watchAcceleration(function(args) {
    	    equal(args.x, 23, 'x should be 23');

            ok(checkAccelWatches(2), 'there should be two watches');

            phonegap.accelerometer.clearWatch(watchId);

            ok(checkAccelWatches(1), 'there should be one watch');

            equal(typeof phonegap.accelerometer.watchList[watchId2], 'number');

            // TODO:  stop should be called at this point

            phonegap.accelerometer.clearWatch(watchId2);

    	    start();
    	}, function() {}, {frequency: 1000});
  	});
	test('should start the GPS if the status is 1', function() {
  		expect(2);

  		stop();

  		ok(checkAccelWatches(0), 'there should be no watches');

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
                    case 'getCurrentAcceleration':
                        PhoneGap.callbackSuccess(callbackId, {x:23});
                        break;
                    default:
                }
            }
        };

    	var watchId = phonegap.accelerometer.watchAcceleration(function(args) {
    	    equal(args.x, 23, 'x should be 23');
    	    start();
    	}, function() {}, {frequency: 1000});
  	});
}

function checkAccelWatches(expect) {
    var watches = 0;
    for (var item in phonegap.accelerometer.watchList) {
        watches++;
    }
    return (watches == expect);
}
