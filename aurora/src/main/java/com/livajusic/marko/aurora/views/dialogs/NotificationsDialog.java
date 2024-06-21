package com.livajusic.marko.aurora.views.dialogs;

import com.vaadin.flow.component.html.H3;

public class NotificationsDialog extends BaseDialog {
    public NotificationsDialog() {
        super();
        H3 text = new H3("Notifications");
        addComponentToDialog(text);
    }
}
