/**
 * This class provides access to notifications on the device.
 */
function Notification() 
{

}

/**
 * Causes the device to blink a status LED.
 * @param {Integer} count The number of blinks.
 * @param {String} colour The colour of the light.
 */
Notification.prototype.blink = function(count, colour) {

};

Notification.prototype.vibrate = function(mills) {
	PhoneGap.exec('com.phonegap.notification', 'vibrate');
};

Notification.prototype.beep = function(count, volume) {
	PhoneGap.exec('com.phonegap.notification', 'beep');
};

/**
 * Open a native alert dialog, with a customizable title and button text.
 * @param {String} message Message to print in the body of the alert
 * @param {String} [title="Alert"] Title of the alert dialog (default: Alert)
 * @param {String} [buttonLabel="OK"] Label of the close button (default: OK)
 */
Notification.prototype.alert = function(message, title, buttonLabel) 
{
	var options = {};

	if (title) 
		options.title = title;
	if (buttonLabel) 
		options.buttonLabel = buttonLabel;

	PhoneGap.exec('Notification.alert', message, options);
	this._alertDelegate = {};
	return this._alertDelegate;
};


/**
 * Open a native alert dialog, with a customizable title and button text.
 * @param {String} message Message to print in the body of the alert
 * @param {String} [title="Alert"] Title of the alert dialog (default: Alert)
 * @param {String} [buttonLabel="OK"] Label of the close button (default: OK)
 * @param {String} [cancelLabel="Cancel"] Label ( if callback is provided )
 * Returns a alertDelegate, to catch the return value add your own onAlertDismissed method
 * onAlertDismissed(index,label) // receives the index + the label of the button the user chose
 */
Notification.prototype.confirm = function(message, title, buttonLabels) 
{
	var labels = buttonLabels ? buttonLabels : "OK,Cancel";
	return this.alert(message, title, labels);
};

Notification.prototype._alertCallback = function(index,label) {
	this._alertDelegate.onAlertDismissed(index,label);
};

PhoneGap.addConstructor(function() { PhoneGap.addExtension('notification', new Notification()); });