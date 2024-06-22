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
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.PasswordField;

public class ChangePasswordDialog extends BaseDialog {
    PasswordField currentPasswordField;
    PasswordField newPasswordField1;
    PasswordField newPasswordField2;

    private final UserService userService;

    public ChangePasswordDialog(UserService userService) {
        super();
        dialog.setCloseOnEsc(true);
        dialog.setCloseOnOutsideClick(true);

        this.userService = userService;

        currentPasswordField = new PasswordField();
        newPasswordField1 = new PasswordField();
        newPasswordField2 = new PasswordField();

        final var layout = createLayout();
        dialog.add(layout);
        dialog.open();
        /*
        this.followService = followService;
        this.userService = userService;
    */
    }

    public VerticalLayout createLayout() {
        VerticalLayout layout = new VerticalLayout();
        layout.setPadding(true);

        H3 titleLabel = new H3("Change Password");
        titleLabel.getStyle().set("font-weight", "bold");

        currentPasswordField.setLabel("Current Password");
        newPasswordField1.setLabel("New Password");
        newPasswordField2.setLabel("Confirm New Password");

        Button changeButton = new Button("Change Password", event -> handleChangePassword());
        changeButton.setWidthFull();

        layout.add(titleLabel, currentPasswordField, newPasswordField1, newPasswordField2, changeButton);

        return layout;

    }

    private void handleChangePassword() {
        String currentPassword = currentPasswordField.getValue();
        String newPassword1 = newPasswordField1.getValue();
        String newPassword2 = newPasswordField2.getValue();

        if (currentPassword.isEmpty() || newPassword1.isEmpty() || newPassword2.isEmpty()) {
            Notification.show("Please fill in all fields.");
            return;
        }

        /*
        final var currentPw = passwordService.getPasswordEncoder().encode(currentPasswordField.getValue());
        final var actualPw = userService.getPassword(userService.getCurrentUsername());

        // Check that current password user entered is correct.
        if (!currentPw.equals(actualPw)) {
            Notification.show("Current password is wrong...");
            return;
        }

        if (!newPassword1.equals(newPassword2)) {
            Notification.show("New passwords do not match.");
            return;
        }

        if (userService.updatePassword(userService.getCurrentUserId(), newPasswordField1.getValue()) == 1) {
            dialog.close();
            Notification.show("Password changed successfully.");
        }
         */
    }
}
