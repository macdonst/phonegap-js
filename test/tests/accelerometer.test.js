Tests.prototype.AccelerometerTests = function() {	
	module('Accelerometer (phonegap.accelerometer)');
	test('should exist', function() {
  		expect(1);
  		equal(typeof phonegap.accelerometer, 'object', 'phonegap.accelerometer should not be null.');
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

/*
  		stop();

        // Android
        CommandManager = {
            execWatch: function(clazz, action, callbackId, jsonArgsString) {
                switch (action) {
                    case 'watchAcceleration':
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
    	*/
  	});
}

function checkAccelWatches(expect) {
    var i=0;
    for (var item in PhoneGap.callbacksWatch) {
        i++;
    }
    return (i == expect);
}
