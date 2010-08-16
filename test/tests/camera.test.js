Tests.prototype.CameraTests = function() {	
	module('Camera (phonegap.camera)');
	test("should exist", function() {
  		expect(1);
  		ok(phonegap.camera != null, "phonegap.camera should not be null.");
	});
	test("should contain a getPicture function", function() {
		expect(1);
		ok(typeof phonegap.camera.getPicture == 'function', "phonegap.camera.getPicture should be a function.");
	});
	test('should return the path to a picture', function() {
	   expect(1); 
	});
};