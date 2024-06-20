package com.livajusic.marko.aurora.views.dialogs;

import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.H2;
import org.springframework.stereotype.Component;

@Component
public class BaseDialog {
    protected Dialog dialog;
    protected H2 title;

    public BaseDialog() {
        this.dialog = new Dialog();
        this.title = new H2();
        addComponentToDialog(title);
        dialog.setWidth("400px");
    }
    public void open() {
        dialog.open();
    }

    public void setWidth(String width) {
        dialog.setWidth(width);
    }

    public void addComponentToDialog(com.vaadin.flow.component.Component component) {
        dialog.add(component);
    }

    public void open(Long gifId) {
        dialog.open();
    }

    public void close() {
        dialog.close();
    }

}
