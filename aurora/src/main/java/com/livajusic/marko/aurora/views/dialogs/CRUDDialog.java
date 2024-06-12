package com.livajusic.marko.aurora.views.dialogs;

import com.livajusic.marko.aurora.services.UserService;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.KeyPressEvent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;

public class CRUDDialog extends BaseDialog {
    private TextField usernameField;
    private TextField passwordField;
    private TextField emailField;

    private final UserService userService;

    public CRUDDialog(String selectedUsername,
                      UserService userService) {
        super();
        this.userService = userService;

        usernameField = new TextField("Username");
        passwordField = new TextField("Password");
        emailField = new TextField("Email");

        usernameField.addKeyPressListener(Key.ENTER, l -> {
            final var userId = userService.getUserIdByUsername(selectedUsername);
            handleEnterKeyPress(userId, selectedUsername, l);
        });
        usernameField.addKeyPressListener(Key.ESCAPE, l -> close());

        passwordField.addKeyPressListener(Key.ENTER, l -> {
            final var userId = userService.getUserIdByUsername(selectedUsername);
            handleEnterKeyPress(userId, selectedUsername, l);
        });
        passwordField.addKeyPressListener(Key.ESCAPE, l -> close());

        emailField.addKeyPressListener(Key.ENTER, l -> {
            final var userId = userService.getUserIdByUsername(selectedUsername);
            handleEnterKeyPress(userId, selectedUsername, l);
        });
        emailField.addKeyPressListener(Key.ESCAPE, l -> close());

        // Add components  the dialog layout
        VerticalLayout layout = new VerticalLayout();
        layout.add(usernameField, passwordField, emailField);

        dialog.add(layout);
    }


    private void handleEnterKeyPress(Long userId, String username, KeyPressEvent event) {
        if (event.getSource() == usernameField) {
            String newUsername = usernameField.getValue();
            System.out.println("changeUsername");
             userService.updateUsername(userId, newUsername);
        } else if (event.getSource() == passwordField) {
            String newPassword = passwordField.getValue();
            System.out.println("changePassword");
            userService.updatePassword(username, newPassword);
        } else if (event.getSource() == emailField) {
            String newEmail = emailField.getValue();
            System.out.println("changeEmail");
            userService.updateEmail(userId, newEmail);
        }

        // close();
    }
}
