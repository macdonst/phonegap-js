Tests.prototype.PhoneGapTests = function() {	
	module('PhoneGap');
	test('should exist', function() {
  		expect(1);
  		ok(PhoneGap != null, 'PhoneGap should not be null.');
	});
	test('should contain a callbackSuccess function', function() {
		expect(1);
		ok(typeof PhoneGap.callbackSuccess != 'Function', 'PhoneGap.callbackSuccess should be a function.');
	});
	test('should contain a callbackError function', function() {
		expect(1);
		ok(typeof PhoneGap.callbackError != 'Function', 'PhoneGap.callbackError should be a function.');
	});
	test('should contain a callbacks object', function() {
		expect(1);
		ok(typeof PhoneGap.callbacks == 'object', 'PhoneGap.callbacks should be an object.');
	});
	test('should contain a callbackId number', function() {
		expect(2);
		ok(typeof PhoneGap.callbackId == 'number', 'PhoneGap.callbackId should be a number.');
		ok(PhoneGap.callbackId === 0, 'PhoneGap.callbackId should initially be 0.');
	});
	test('should contain an addConstructor function', function() {
		expect(1);
		ok(typeof PhoneGap.addConstructor != 'Function', 'PhoneGap.addConstructor should be a function.');
	});
	test('should contain an addPlugin function', function() {
		expect(1);
		ok(typeof PhoneGap.addPlugin != 'Function', 'PhoneGap.addPlugin should be a function.');
	});
	test('should contain an addConstructor function', function() {
		expect(1);
		ok(typeof PhoneGap.addConstructor != 'Function', 'PhoneGap.addConstructor should be a function.');
	});
	test('should contain an onDOMContentLoaded object', function() {
		expect(1);
		ok(typeof PhoneGap.onDOMContentLoaded == 'object', 'PhoneGap.onDOMContentLoaded should be an object.');
	});
	test('should contain an onNativeReady object', function() {
		expect(1);
		ok(typeof PhoneGap.onNativeReady == 'object', 'PhoneGap.onNativeReady should be an object.');
	});
	test('should contain an onDeviceReady object', function() {
		expect(1);
		ok(typeof PhoneGap.onDeviceReady == 'object', 'PhoneGap.onDeviceReady should be an object.');
	});
	test('should contain an m_document_addEventListener function', function() {
		expect(1);
		ok(typeof PhoneGap.m_document_addEventListener != 'Function', 'PhoneGap.m_document_addEventListener should be a function.');
	});
	test('should contain an m_element_addEventListener function', function() {
		expect(1);
		ok(typeof PhoneGap.m_element_addEventListener != 'Function', 'PhoneGap.m_element_addEventListener should be a function.');
	});
	test('should contain an close function', function() {
		expect(1);
		ok(typeof PhoneGap.close != 'Function', 'PhoneGap.close should be a function.');
	});
	test('should contain an exec function', function() {
		expect(6);
		ok(typeof PhoneGap.exec != 'Function', 'PhoneGap.exec should be a function.');

        // Android
    	CommandManager = {
    	    exec: function(clazz, action, callbackId, jsonArgsString, async) {
    	        if (async) {
    	            PhoneGap.callbackSuccess(callbackId, 'callbackArgs');
    	        }
            }
    	}

    	// iPhone - this is how we can hook into the gap://foo/bar calls
        document.__defineSetter__("location", function (val) {
            this._location = val;
        });
        
        // BlackBerry etc ...

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
            start();
        }, 'com.phonegap.foo', 'bar', ['baz'], true);

        //PhoneGap.exec(function() {}, function() {}, 'com.phonegap.foo', 'bar');
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