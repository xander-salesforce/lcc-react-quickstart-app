({
    handleMessage: function(component, message, helper) {
        var payload = message.getParams().payload;
        if (payload.name !== "LccToastEvent") {
            return;
        }
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": payload.name,
            "type": payload.subtype,
            "message": payload.value
        });
        toastEvent.fire();
    }
})
