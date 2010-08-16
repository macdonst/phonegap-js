Tests.prototype.NotificationTests = function() {	
	module('Notification (navigator.notification)');
	test("should exist", function() {
  		expect(1);
  		ok(phonegap.notification != null, "phonegap.notification should not be null.");
	});
	test("should contain a vibrate function", function() {
		expect(1);
		ok(typeof phonegap.notification.vibrate == 'function', "phonegap.notification.vibrate should be a function.");
	});
	test("should contain a beep function", function() {
		expect(1);
		ok(typeof phonegap.notification.beep == 'function', "phonegap.notification.beep should be a function.");
	});
	test("should contain an alert function", function() {
		expect(1);
		ok(typeof phonegap.notification.alert == 'function', "phonegap.notification.alert should be a function.");
	});
};