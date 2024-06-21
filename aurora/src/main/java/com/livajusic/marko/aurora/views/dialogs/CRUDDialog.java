/*
 * This file is part of Aurora.
 *
 * Aurora is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Aurora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Aurora. If not, see <https://www.gnu.org/licenses/>.
 *
 * Author: Marko Livajusic
 * Email: marko.livajusic4 <at> gmail.com
 * Copyright: (C) 2024 Marko Livajusic
 */
package com.livajusic.marko.aurora.views.dialogs;

import com.livajusic.marko.aurora.services.UserService;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.KeyPressEvent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;

public class CRUDDialog extends BaseDialog {
    private final TextField usernameField;
    private final PasswordField passwordField;
    private final TextField emailField;

    private final UserService userService;

    public CRUDDialog(String selectedUsername,
                      UserService userService) {
        super();
        this.userService = userService;

        usernameField = new TextField("Username");
        passwordField = new PasswordField("Password");
        emailField = new TextField("Email");

        usernameField.addKeyPressListener(Key.ENTER, l -> {
            final var userId = userService.getUserIdByUsername(selectedUsername);
            handleEnterKeyPress(userId, l);
        });
        usernameField.addKeyPressListener(Key.ESCAPE, l -> close());

        passwordField.addKeyPressListener(Key.ENTER, l -> {
            final var userId = userService.getUserIdByUsername(selectedUsername);
            handleEnterKeyPress(userId, l);
        });
        passwordField.addKeyPressListener(Key.ESCAPE, l -> close());

        emailField.addKeyPressListener(Key.ENTER, l -> {
            final var userId = userService.getUserIdByUsername(selectedUsername);
            handleEnterKeyPress(userId, l);
        });
        emailField.addKeyPressListener(Key.ESCAPE, l -> close());

        // Add components  the dialog layout
        VerticalLayout layout = new VerticalLayout();
        layout.add(usernameField, emailField);

        dialog.add(layout);
    }


    private void handleEnterKeyPress(Long userId, KeyPressEvent event) {
        if (event.getSource() == usernameField) {
            String newUsername = usernameField.getValue();
            System.out.println("changeUsername");
             userService.updateUsername(userId, newUsername);
        } else if (event.getSource() == passwordField) {
            String newPassword = passwordField.getValue();
            System.out.println("changePassword");
            userService.updatePassword(userId, newPassword);
        } else if (event.getSource() == emailField) {
            String newEmail = emailField.getValue();
            System.out.println("changeEmail");
            userService.updateEmail(userId, newEmail);
        }

        // close();
    }
}
