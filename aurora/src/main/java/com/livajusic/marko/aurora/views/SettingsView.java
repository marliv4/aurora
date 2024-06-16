package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.services.*;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.H1;
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
import org.springframework.beans.factory.annotation.Autowired;


@PageTitle("Settings")
@Route(value = "/settings")
@RolesAllowed({"user"})
public class SettingsView extends VerticalLayout {
    private final SettingsService settingsService;

    private final LanguagesController languagesController;

    @Autowired
    private final UserService userService;
    public SettingsView(SettingsService settingsService,
                        ValuesService valuesService,
                        UserService userService,
                        ProfilePictureService profilePictureService,
                        LanguagesController languagesController) {
        this.settingsService = settingsService;
        this.userService = userService;
        this.languagesController = languagesController;

        NavigationBar navbar = new NavigationBar(valuesService, userService, profilePictureService, languagesController);
        add(navbar);

        H1 title = new H1(languagesController.get("settings"));
        title.getStyle().set("text-align", "center");
        add(title);

        FormLayout formLayout = new FormLayout();
        formLayout.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("25em", 2)
        );

        ComboBox<String> languageSelect = new ComboBox<>(languagesController.get("language"));
        languageSelect.setItems("English", "German");

        final var userId = userService.getCurrentUserId();
        languageSelect.setValue(settingsService.getUsersLanguage(userId));

        languageSelect.addValueChangeListener(l -> {
            String selectedLanguage = l.getValue();
            languagesController.switchLanguage(selectedLanguage);
            settingsService.updateUsersLanguage(userId, selectedLanguage);
        });
        formLayout.addFormItem(languageSelect, languagesController.get("select_language"));

        ComboBox<String> themeSelect = getThemeSelector(userId);

        formLayout.addFormItem(themeSelect, languagesController.get("select_theme"));
        add(formLayout);

        PasswordField newPasswordField = new PasswordField(languagesController.get("password"));
        newPasswordField.setPlaceholder(languagesController.get("new_password"));

        Button changePasswordButton = getNewPasswordButton(newPasswordField);

        formLayout.add(newPasswordField, changePasswordButton);
        formLayout.setResponsiveSteps(new FormLayout.ResponsiveStep("0", 1));
        formLayout.addClassName("register_form");

        VerticalLayout formContainer = new VerticalLayout();
        formContainer.setWidth("400px");
        formContainer.getStyle().set("margin", "auto");
        formContainer.add(formLayout);

        add(formContainer);

        RadioButtonGroup<String> privateProfileChooser = getStringRadioButtonGroup(userId);
        formLayout.add(privateProfileChooser);
    }

    private ComboBox<String> getThemeSelector(Long userId) {
        ComboBox<String> themeSelect = new ComboBox<>(languagesController.get("theme"));
        themeSelect.setItems("Light", "Dark");
        themeSelect.setValue(settingsService.getUsersTheme(userId));
        themeSelect.addValueChangeListener(l -> {
            String selectedTheme = l.getValue();
            settingsService.updateUsersTheme(userId, selectedTheme);
        });

        return themeSelect;
    }

    private RadioButtonGroup<String> getStringRadioButtonGroup(Long userId) {
        RadioButtonGroup<String> privateProfileChooser = new RadioButtonGroup<>();
        privateProfileChooser.setLabel(languagesController.get("private_profile"));
        privateProfileChooser.setItems(languagesController.get("on"), languagesController.get("off"));

        boolean privateProfile = settingsService.isUsersProfilePrivate(userId);
        if (privateProfile) {
            privateProfileChooser.setValue(languagesController.get("on"));
        } else {
            privateProfileChooser.setValue(languagesController.get("off"));
        }

        privateProfileChooser.addValueChangeListener(event -> {
            String selected = event.getValue().toLowerCase();
            System.out.println("Selected: " + selected);
            int wantsPrivateProfile = 0;
            if (selected.equals(languagesController.get("on").toLowerCase())) {
                wantsPrivateProfile = 1;
            }
            System.out.println("passing: " + wantsPrivateProfile);
            settingsService.updateProfilePrivacy(userId, wantsPrivateProfile);
        });
        return privateProfileChooser;
    }

    private Button getNewPasswordButton(PasswordField passwordField) {
        Button changePasswordButton = new Button(languagesController.get("change_password"));
        changePasswordButton.addClickListener(e -> {
            String newPassword = passwordField.getValue();
            if (newPassword.isEmpty()) {
                final var n = Notification.show(languagesController.get("enter_new_password"));
                n.addThemeVariants(NotificationVariant.LUMO_ERROR);
            } else {
                if (userService.updatePassword(userService.getCurrentUserId(), newPassword) == 1) {
                    GIFDisplayService.notify("Changed password successfully!");
                }
            }
        });
        return changePasswordButton;
    }
}

