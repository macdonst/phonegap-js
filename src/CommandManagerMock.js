// This is to mock the Android CommandManager

CommandManagerMock = {
    exec: function(clazz, action, callbackId, jsonArgs, async) {
        // Need to make sure that the right args get passed to this function ...
        // Need to make sure that the args passed to callbacks are dealt with correctly ...
        var args = JSON.parse(jsonArgs);
        if (async) {
            setTimeout(function() {
                PhoneGap.callbackSuccess(callbackId, {});
            }, 100);
            setTimeout(function() {
                PhoneGap.callbackError(callbackId, {});
            }, 100);
            return "";
        } else {
            return "PhoneGap.callbackSuccess('"+callbackId+"', {});";
        }
    }
};