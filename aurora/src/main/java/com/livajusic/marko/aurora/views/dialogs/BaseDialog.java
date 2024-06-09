package com.livajusic.marko.aurora.views.dialogs;

import com.livajusic.marko.aurora.services.FollowService;
import com.vaadin.flow.component.dialog.Dialog;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BaseDialog {
    protected Dialog dialog;

    public BaseDialog() {
        this.dialog = new Dialog();
        dialog.setWidth("400px");
    }
    public void open() {
        dialog.open();
    }

    public void close() {
        dialog.close();
    }

}
