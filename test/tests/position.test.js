Tests.prototype.PositionTests = function() {	
	module('Position');
	test('should exist', function() {
  		expect(1);
  		equal(typeof Position, 'function', 'Position should be a function.');
	});
	
	module('Coordinates');
	test('should exist', function() {
  		expect(1);
  		equal(typeof Coordinates, 'function', 'Position should be a function.');
	});
	test('should have latitude property', function() {
  		expect(1);
  		var po = new Coordinates(1);
  		equal(po.latitude, 1, 'latitude should be 1.');
	});
	test('should have longitude property', function() {
  		expect(1);
  		var po = new Coordinates(null, 10);
  		equal(po.longitude, 10, 'longitude should be 10.');
	});
	test('should have altitude property', function() {
  		expect(1);
  		var po = new Coordinates(null, null, 100);
  		equal(po.altitude, 100, 'altitude should be 100.');
	});
	test('should have accuracy property', function() {
  		expect(1);
  		var po = new Coordinates(null, null, null, 1000);
  		equal(po.accuracy, 1000, 'accuracy should be 1000.');
	});
	test('should have heading property', function() {
  		expect(1);
  		var po = new Coordinates(null, null, null, null, 10000);
  		equal(po.heading, 10000, 'heading should be 10000.');
	});
	test('should have speed property', function() {
  		expect(1);
  		var po = new Coordinates(null, null, null, null, null, 100000);
  		equal(po.speed, 100000, 'speed should be 100000.');
	});
	test('should have good default values', function() {
  		expect(6);
  		var po = new Coordinates();
  		equal(po.latitude, 0, 'latitude should be zero.');
  		equal(po.longitude, 0, 'longitude should be zero.');
  		equal(po.accuracy, 0, 'accuracy should be zero.');
  		equal(po.altitude, 0, 'altitude should be zero.');
  		equal(po.heading, 0, 'heading should be zero.');
  		equal(po.speed, 0, 'speed should be zero.');
	});


	module('PositionError');
	test('should exist', function() {
  		expect(1);
  		equal(typeof PositionError, 'function', 'Position should be a function.');
	});
	test('should have PostionError codes', function() {
  		expect(4);
  		equal(PositionError.UNKNOWN_ERROR, 0);
        equal(PositionError.PERMISSION_DENIED, 1);
        equal(PositionError.POSITION_UNAVAILABLE, 2);
        equal(PositionError.TIMEOUT, 3);
	});
	test('should have code property', function() {
  		expect(1);
  		var po = new PositionError(PositionError.POSITION_UNAVAILABLE);
  		equal(po.code, PositionError.POSITION_UNAVAILABLE, 'code should be PositionError.POSITION_UNAVAILABLE.');
	});
	test('should have message property', function() {
  		expect(1);
  		var po = new PositionError(null, 'foo');
  		equal(po.message, 'foo', 'message should be "foo".');
	});
	test('should have good defaults', function() {
  		expect(2);
  		var po = new PositionError();
  		equal(po.code, PositionError.UNKNOWN_ERROR, 'code should be PositionError.UNKNOWN_ERROR.');
  		equal(po.message, '', 'message should be "".');
	});


	module('PositionOptions');
	test('should exist', function() {
  		expect(1);
  		equal(typeof PositionOptions, 'function', 'PositionOptions should be a function.');
	});
	test('should have enableHighAccuracy property', function() {
  		expect(1);
  		var po = new PositionOptions(true);
  		equal(po.enableHighAccuracy, true, 'enableHighAccuracy should be true.');
	});
	test('should have timeout property', function() {
  		expect(1);
  		var po = new PositionOptions(null, 10);
  		equal(po.timeout, 10, 'timeout should be 10.');
	});
	test('should have maximumAge property', function() {
  		expect(1);
  		var po = new PositionOptions(null, null, 100);
  		equal(po.maximumAge, 100, 'maximumAge should be 100.');
	});
	test('should have minimumAccuracy property', function() {
  		expect(1);
  		var po = new PositionOptions(null, null, null, 1000);
  		equal(po.minimumAccuracy, 1000, 'minimumAccuracy should be 1000.');
	});
	test('should have good defaults', function() {
  		expect(4);
  		var po = new PositionOptions();
  		equal(po.enableHighAccuracy, false, 'enableHighAccuracy should be false.');
  		equal(po.timeout, 10000000, 'timeout should be 10000000.');
  		equal(po.maximumAge, 0, 'maximumAge should be 0.');
  		equal(po.minimumAccuracy, 10000000, 'minimumAccuracy should be 10000000.');
	});
};