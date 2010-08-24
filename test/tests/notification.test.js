Tests.prototype.NotificationTests = function() {	
	module('Notification (navigator.notification)');
	test("should exist", function() {
  		expect(1);
  		ok(phonegap.notification != null, "phonegap.notification should not be null.");
	});
	test("should contain a vibrate function", function() {
		expect(2);
		
		stop();
		
		ok(typeof phonegap.notification.vibrate == 'function', "phonegap.notification.vibrate should be a function.");

        // Android
        CommandManager = {
            exec: function(clazz, action, callbackId, args) {
                if (clazz == 'com.phonegap.Notification' && action == 'vibrate') {
                    ok(true);
                    start();
                }
            }
        };

		phonegap.notification.vibrate(1000);

        start();
	});
	test("should contain a beep function", function() {
		expect(2);
		
		stop();

		ok(typeof phonegap.notification.beep == 'function', "phonegap.notification.beep should be a function.");

        // Android
        CommandManager = {
            exec: function(clazz, action, callbackId, args) {
                if (clazz == 'com.phonegap.Notification' && action == 'beep') {
                    ok(true);
                    start();
                }
            }
        };

		phonegap.notification.beep(100, 3);
	});
	test("should contain a blink function", function() {
		expect(2);
		
		stop();
		
		ok(typeof phonegap.notification.blink == 'function', "phonegap.notification.blink should be a function.");
		
		// Android
        CommandManager = {
            exec: function(clazz, action, callbackId, args) {
                if (clazz == 'com.phonegap.Notification' && action == 'blink') {
                    ok(true);
                    start();
                }
            }
        };
		
		phonegap.notification.blink(1000, 'red');
	});
	test("should contain an alert function", function() {
		expect(2);
		
		stop();
		
		ok(typeof phonegap.notification.alert == 'function', "phonegap.notification.alert should be a function.");
		
		// Android
        CommandManager = {
            exec: function(clazz, action, callbackId, args) {
                if (clazz == 'com.phonegap.Notification' && action == 'alert') {
                    ok(true);
                    start();
                }
            }
        };
        
		phonegap.notification.alert(function() {
		    
		    }, function() {}, 'message', 'title', 'button label');
	});
};