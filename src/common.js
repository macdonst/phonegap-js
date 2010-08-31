/**
 * Add an initialization function to a queue that ensures it will run and initialize
 * application constructors only once PhoneGap has been initialized.
 * @param {Function} func The function callback you want run once PhoneGap is initialized
 */
PhoneGap.addConstructor = function(func) {
    PhoneGap.onDeviceReady.subscribeOnce(function() {
        try {
            func();
        } catch(e) {
            if (typeof(debug['log']) == 'function') {
                debug.log("Failed to run constructor: " + debug.processMessage(e));
            } else {
                alert("Failed to run constructor: " + e.message);
            }
        }
    });
};

PhoneGap.addExtension = function(name, obj) {
    if (typeof phonegap[name] == 'undefined') {
        phonegap[name] = obj;
    }
};

/**
 * Adds a plugin object to window.plugins
 */
PhoneGap.addPlugin = function(name, obj) {
	if ( !window.plugins ) {
		window.plugins = {};
	}
	if ( !window.plugins[name] ) {
		window.plugins[name] = obj;
	}
};

/**
 * onDOMContentLoaded channel is fired when the DOM content 
 * of the page has been parsed.
 */
PhoneGap.onDOMContentLoaded = new PhoneGap.Channel();

/**
 * onNativeReady channel is fired when the PhoneGap native code
 * has been initialized.
 */
PhoneGap.onNativeReady = new PhoneGap.Channel();

// _nativeReady is global variable that the native side can set
// to signify that the native code is ready. It is a global since 
// it may be called before any PhoneGap JS is ready.
if (typeof _nativeReady !== 'undefined') { PhoneGap.onNativeReady.fire(); }

/**
 * onDeviceReady is fired only after both onDOMContentLoaded and 
 * onNativeReady have fired.
 */
PhoneGap.onDeviceReady = new PhoneGap.Channel();

PhoneGap.Channel.join(function() {
    PhoneGap.onDeviceReady.fire();
}, [ PhoneGap.onDOMContentLoaded, PhoneGap.onNativeReady ]);


// Listen for DOMContentLoaded and notify our channel subscribers
document.addEventListener('DOMContentLoaded', function() {
    PhoneGap.onDOMContentLoaded.fire();
}, false);


// Intercept calls to document.addEventListener and watch for deviceready
PhoneGap.m_document_addEventListener = document.addEventListener;

document.addEventListener = function(evt, handler, capture) {
    if (evt.toLowerCase() == 'deviceready') {
        if (PhoneGap.desktop) {
            window.onload = handler;
            PhoneGap.onDeviceReady.fire();
        } else {
            PhoneGap.onDeviceReady.subscribeOnce(handler);
        }
    } else {
        PhoneGap.m_document_addEventListener.call(document, evt, handler);
    }
};

// Intercept calls to Element.addEventListener for some platforms
PhoneGap.m_element_addEventListener = Element.prototype.addEventListener;

/**
 * For BlackBerry, the touchstart event does not work so we need to do click
 * events when touchstart events are attached.
 */
/*
Element.prototype.addEventListener = function(evt, handler, capture) {
    if (evt === 'touchstart') {
        evt = 'click';
    }
    PhoneGap.m_element_addEventListener.call(this, evt, handler, capture);
};
*/

PhoneGap.close = function(context, func, params) {
    if (typeof params === 'undefined') {
        return function() {
            return func.apply(context, arguments);
        }
    } else {
        return function() {
			var args = Array.prototype.slice.call(arguments);
            return func.apply(context, params.concat(args));
        }
    }
};