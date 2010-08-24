Tests.prototype.PhoneGapTests = function() {	
	module('PhoneGap');
	test('should exist', function() {
  		expect(1);
  		equal(typeof PhoneGap, 'object', 'PhoneGap should not be null.');
	});
	test('should contain a callbackSuccess function', function() {
		expect(1);
		equal(typeof PhoneGap.callbackSuccess, 'function', 'PhoneGap.callbackSuccess should be a function.');
	});
	test('should contain a callbackError function', function() {
		expect(1);
		equal(typeof PhoneGap.callbackError, 'function', 'PhoneGap.callbackError should be a function.');
	});
	test('should contain a callbacks object', function() {
		expect(1);
		equal(typeof PhoneGap.callbacks, 'object', 'PhoneGap.callbacks should be an object.');
	});
	test('should contain a callbackId number', function() {
		expect(1);
		equal(typeof PhoneGap.callbackId, 'number', 'PhoneGap.callbackId should be a number.');
	});
	test('should contain an addConstructor function', function() {
		expect(1);
		equal(typeof PhoneGap.addConstructor, 'function', 'PhoneGap.addConstructor should be a function.');
	});
	test('should contain an addPlugin function', function() {
		expect(1);
		equal(typeof PhoneGap.addPlugin, 'function', 'PhoneGap.addPlugin should be a function.');
	});
	test('should contain an addConstructor function', function() {
		expect(1);
		equal(typeof PhoneGap.addConstructor, 'function', 'PhoneGap.addConstructor should be a function.');
	});
	test('should contain an onDOMContentLoaded object', function() {
		expect(2);
		equal(typeof PhoneGap.onDOMContentLoaded, 'object', 'PhoneGap.onDOMContentLoaded should be an object.');
		ok(PhoneGap.onDOMContentLoaded.fired);
	});
	test('should contain an onNativeReady object', function() {
		expect(2);
		equal(typeof PhoneGap.onNativeReady, 'object', 'PhoneGap.onNativeReady should be an object.');
		// THIS SHOULD ONLY FIRE IF ON A DEVICE
		ok(PhoneGap.onNativeReady.fired);
	});
	test('should contain an onDeviceReady object', function() {
		expect(2);
		equal(typeof PhoneGap.onDeviceReady, 'object', 'PhoneGap.onDeviceReady should be an object.');
		// THIS SHOULD ONLY FIRE IF ON A DEVICE
		ok(PhoneGap.onNativeReady.fired);
	});
	test('should contain an m_document_addEventListener function', function() {
		expect(1);
		equal(typeof PhoneGap.m_document_addEventListener, 'function', 'PhoneGap.m_document_addEventListener should be a function.');
	});
	test('should contain an m_element_addEventListener function', function() {
		expect(1);
		equal(typeof PhoneGap.m_element_addEventListener, 'function', 'PhoneGap.m_element_addEventListener should be a function.');
	});
	test('should contain an close function', function() {
		expect(1);
		equal(typeof PhoneGap.close, 'function', 'PhoneGap.close should be a function.');
	});
	test('should contain an exec function', function() {
		expect(6);
		equal(typeof PhoneGap.exec, 'function', 'PhoneGap.exec should be a function.');

        // Android
    	CommandManager = {
    	    exec: function(clazz, action, callbackId, jsonArgsString) {
	            PhoneGap.callbackSuccess(callbackId, 'callbackArgs');
            }
    	}

    	// iPhone - this is how we can hook into the gap://foo/bar calls
        document.__defineSetter__("location", function (val) {
            this._location = val;
        });
        
        // BlackBerry etc ...
        //

    	var clazz = 'com.phonegap.foo';
    	var callbackId = clazz + PhoneGap.callbackId;
        PhoneGap.exec(function success(args) {
            equal(typeof PhoneGap.callbacks[callbackId], 'object', 'PhoneGap.callbacks[callbackId] should contain a new object');
            equal(typeof PhoneGap.callbacks[callbackId].success, 'function', 'PhoneGap.callbacks[callbackId] should have a success function');
            equal(typeof PhoneGap.callbacks[callbackId].fail, 'function', 'PhoneGap.callbacks[callbackId] should have a fail function');
            equal(typeof args, 'string');
            equal(args, 'callbackArgs', 'success callback should be passed some args from the CommandManager');
            start();
        }, function fail() {
            ok(false, 'in the fail callback');
            start();
        }, 'com.phonegap.foo', 'bar', ['baz']);

        //PhoneGap.exec(function() {}, function() {}, 'com.phonegap.foo', 'bar');
	});
	test('should contain a callbacksWatch object', function() {
		expect(1);
		equal(typeof PhoneGap.callbacksWatch, 'object', 'PhoneGap.callbacks should be an object.');
	});
	test('should contain a clearWatch function', function() {
	    expect(1);
	    equal(typeof PhoneGap.clearWatch, 'function', 'typeof PhoneGap.clearWatch should be a function');
	});
	test('should contain an execWatch function', function() {
		expect(15);
		equal(typeof PhoneGap.execWatch, 'function', 'PhoneGap.execWatch should be a function.');

        // Android
    	CommandManager.execWatch = function(clazz, action, watchId, jsonArgsString, async) {
    	    if (async) {
    	        PhoneGap.callbackWatchSuccess(clazz, 'callbackArgs');
    	    }
        };

    	// iPhone - this is how we can hook into the gap://foo/bar calls
        document.__defineSetter__("location", function (val) {
            this._location = val;
        });

        // BlackBerry etc ...

    	var clazz = 'com.phonegap.foo';
    	var watchId = PhoneGap.watchId;    	
        var watchResult = PhoneGap.execWatch(function success(args) {
            equal(typeof args, 'string');
            equal(args, 'callbackArgs', 'success callback should be passed some args from the CommandManager');
            start();
        }, function fail() {
            start();
        }, 'com.phonegap.foo', 'bar', ['baz'], true);

        equal(typeof PhoneGap.callbacksWatch[clazz], 'object', 'PhoneGap.callbacksWatch[clazz] should be an object');
        equal(typeof PhoneGap.callbacksWatch[clazz][watchId], 'object', 'PhoneGap.callbacksWatch[clazz][watchId] should be an object');
        equal(typeof PhoneGap.callbacksWatch[clazz][watchId].success, 'function', 'PhoneGap.callbacksWatch[clazz][watchId] should have a success function');
        equal(typeof PhoneGap.callbacksWatch[clazz][watchId].fail, 'function', 'PhoneGap.callbacksWatch[clazz][watchId] should have a fail function');

        // watchResult should have a watchId property, a status, and a message or relevant return value


        var watchId2 = PhoneGap.watchId;
	    // Add a second watch to the same class (this could be accelerometer for example ...)
        PhoneGap.execWatch(function success(args) { }, function fail() { }, 'com.phonegap.foo', 'bar', ['baz'], true);


        ok(checkCallbacks(clazz, 1), 'there should be one class in the callbacksWatch collection and it should be the one we registered');
        ok(checkWatches(clazz, 2), 'there should be 2 watchIds for this class');


        // Clear one of the watches
        PhoneGap.clearWatch(clazz, watchId);


        ok(checkCallbacks(clazz, 1), 'there should still be one class in the callbacksWatch collection and it should be the one we registered');
        ok(checkWatches(clazz, 1), 'there should be 1 watchIds for this class');


        CommandManager.execStopWatch = function(c) {
            equal(c, clazz, 'the CommandManager.execStopWatch method should be called since there are no more watches for this class');
            start();
        }

        stop();
        // Clear the second watch
        PhoneGap.clearWatch(clazz, watchId2);

        ok(checkCallbacks(clazz, 0), 'after clearing the second watch there should be no watch callbacks for this class');
	});	
	test('should contain a callbackWatchSuccess function', function() {
	    expect(1);
	    equal(typeof PhoneGap.callbackWatchSuccess, 'function', 'typeof PhoneGap.callbackWatchSuccess should be a function');
	});
    test('deviceready', function() {
        expect(2);
        var hasHandler = false;
        for (var item in PhoneGap.onDeviceReady.handlers) {
            hasHandler = true;
            break;
        }
        ok(!hasHandler, 'there should be no handlers attached to onDeviceReady by default');

        PhoneGap.desktop = false;
        
        document.addEventListener('deviceready', function() {}, false);
        
        PhoneGap.desktop = true;

        var handlers = 0;
        for (var item in PhoneGap.onDeviceReady.handlers) {
            handlers++;
        }
        equal(handlers, 1, 'after adding the deviceready event listener onDeviceReady should have one handler');

    })
};


function checkCallbacks(clazz, expected) {
    var callbackClazzes = 0;
    var callbackClazz = '';
    for (var item in PhoneGap.callbacksWatch) {
        callbackClazzes++;
        callbackClazz = item;
    }
    if (callbackClazzes == 0) {
        return (callbackClazzes == expected);
    } else {
        return (callbackClazzes == expected && callbackClazz == clazz);
    }
}

function checkWatches(clazz, expected) {
    var watchIds = 0;
    for (var item in PhoneGap.callbacksWatch[clazz]) {
        watchIds++;
    }
    return (watchIds == expected);
}