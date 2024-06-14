package com.livajusic.marko.aurora.views;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

import jakarta.annotation.security.RolesAllowed;


@PageTitle("Settings")
@Route(value = "/settings")
@RolesAllowed({"user"})
public class SettingsView extends VerticalLayout {

    public SettingsView() {
        add(new H2("Settings"));

        FormLayout formLayout = new FormLayout();
        formLayout.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("25em", 2)
        );

        // Language selection
        ComboBox<String> languageSelect = new ComboBox<>("Language");
        languageSelect.setItems("English", "German");
        languageSelect.setValue("English"); // Set default value
        formLayout.addFormItem(languageSelect, "Select Language");

        // Theme selection
        ComboBox<String> themeSelect = new ComboBox<>("Theme");
        themeSelect.setItems("Light", "Dark");
        themeSelect.setValue("Light"); // Set default value
        formLayout.addFormItem(themeSelect, "Select Theme");

        add(formLayout);

        Button saveButton = new Button("Save");
        saveButton.addClickListener(event -> saveSettings());
        add(saveButton);

        // New password field
        PasswordField newPasswordField = new PasswordField("New Password");
        newPasswordField.setPlaceholder("Enter new password");

        // Change password button
        Button changePasswordButton = new Button("Change Password");
        changePasswordButton.addClickListener(e -> {
            String newPassword = newPasswordField.getValue();
            if (newPassword.isEmpty()) {
                final var n = Notification.show("Please enter a new password");
                n.addThemeVariants(NotificationVariant.LUMO_ERROR);
            } else {
                // changePassword(newPassword);
            }
        });

        formLayout.add(newPasswordField, changePasswordButton);
        formLayout.setResponsiveSteps(new FormLayout.ResponsiveStep("0", 1));

        formLayout.getStyle()
                .set("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2)")
                .set("padding", "20px")
                .set("border-radius", "10px")
                .set("background-color", "#fff");

        // Container to center the form
        VerticalLayout formContainer = new VerticalLayout();
        formContainer.setWidth("400px"); // Fixed width for the form container
        formContainer.getStyle().set("margin", "auto");
        formContainer.add(formLayout);

        // Add the form container to the main layout
        add(formContainer);

        RadioButtonGroup<String> radioButtonGroup = new RadioButtonGroup<>();
        radioButtonGroup.setLabel("Privacy Settings");
        radioButtonGroup.setItems("Enabled", "Disabled");

        radioButtonGroup.addValueChangeListener(event -> {
            String selected = event.getValue().toLowerCase();
            System.out.println("Selected: " + selected);
            // final var sessionUsername = userService.getCurrentUsername();
            int setting = 0;
            if (selected.equals("enabled")) {
                setting = 1;
            }
            // userService.updateProfilePrivacy(sessionUsername, setting);
        });

        add(radioButtonGroup);
    }

    private void saveSettings() {
        System.out.println("saving");
    }
}

