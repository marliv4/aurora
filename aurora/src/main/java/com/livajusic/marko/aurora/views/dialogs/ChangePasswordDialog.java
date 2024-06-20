package com.livajusic.marko.aurora.views.dialogs;

import com.livajusic.marko.aurora.services.FollowService;
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

        // Basic validation
        if (currentPassword.isEmpty() || newPassword1.isEmpty() || newPassword2.isEmpty()) {
            Notification.show("Please fill in all fields.");
            return;
        }

        if (!newPassword1.equals(newPassword2)) {
            Notification.show("New passwords do not match.");
            return;
        }

        final var oldPwEntry = currentPasswordField.getValue();
        final var actualPw = userService.getPassword(userService.getCurrentUsername());
        System.out.println("oldpw: " + oldPwEntry);
        System.out.println("actualPw: " + actualPw);

        // Check that old password user entered is correct.
        /*if (!userService.getPassword(userService.getCurrentUsername()).equals(oldPw)) {
            Notification.show("Current password is wrong..");
            return;
        }*/

        if (userService.updatePassword(userService.getCurrentUserId(), newPasswordField1.getValue()) == 1) {
            dialog.close();
            Notification.show("Password changed successfully.");
        }
    }
}
