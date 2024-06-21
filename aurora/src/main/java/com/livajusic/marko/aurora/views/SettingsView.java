package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.services.*;
import com.livajusic.marko.aurora.views.dialogs.ChangePasswordDialog;
import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;


@PageTitle("Settings")
@Route(value = "/settings")
@RolesAllowed({"user"})
public class SettingsView extends VerticalLayout {
    private final SettingsService settingsService;

    private final LanguagesController languagesController;

    @Autowired
    private final UserService userService;
    public SettingsView(SettingsService settingsService,
                        UserService userService,
                        ProfilePictureService profilePictureService,
                        LanguagesController languagesController) {
        this.settingsService = settingsService;
        this.userService = userService;
        this.languagesController = languagesController;
        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService);
        add(navbar);

        final Long userId = userService.getCurrentUserId();

        Tab accountTab = new Tab("Account");
        Tab profileTab = new Tab("Profile");
        Tab privacyTab = new Tab("Privacy");
        Tab preferencesTab = new Tab("Preferences");
        Tab notificationsTab = new Tab("Notifications");
        Tab emailTab = new Tab("Email");
        Tabs tabs = new Tabs(accountTab, profileTab, privacyTab, preferencesTab, notificationsTab, emailTab);
        tabs.setWidthFull();

        Map<Tab, VerticalLayout> tabsToLayouts = new HashMap<>();
        tabsToLayouts.put(accountTab, createAccountLayout());
        tabsToLayouts.put(profileTab, createProfileLayout());
        tabsToLayouts.put(privacyTab, createPrivacyLayout(userId));
        tabsToLayouts.put(preferencesTab, createPreferencesLayout());
        tabsToLayouts.put(notificationsTab, createNotificationsLayout());
        tabsToLayouts.put(emailTab, createEmailLayout());

        VerticalLayout content = new VerticalLayout(tabsToLayouts.get(accountTab));
        content.setWidthFull();

        tabs.addSelectedChangeListener(event -> {
            content.removeAll();
            content.add(tabsToLayouts.get(event.getSelectedTab()));
        });

        add(tabs, content);
    }

    private VerticalLayout createAccountLayout() {
        VerticalLayout layout = new VerticalLayout();
        layout.add(new H3("General"));
        final String email = userService.getEmail(userService.getCurrentUserId());

        layout.add(new H3("Email address: "), new Text(email));
        Button changePwBtn = new Button("Change Password");
        changePwBtn.addClickListener(e -> {
            System.out.println("changePwBtn");
            ChangePasswordDialog changePasswordDialog = new ChangePasswordDialog(userService);
            changePasswordDialog.open();
        });

        layout.add(new H3("Password"), changePwBtn);
        return layout;
    }

    private VerticalLayout createProfileLayout() {
        return new VerticalLayout();
    }

    private VerticalLayout createPrivacyLayout(Long userId) {
        VerticalLayout layout = new VerticalLayout();

        Checkbox seeFollowersCheckbox = new Checkbox("Allow others to see my followers");
        seeFollowersCheckbox.setValue(settingsService.canOthersSeeFollowers(userId));
        seeFollowersCheckbox.addValueChangeListener(event -> {
            settingsService.updateCanOthersSeeFollowers(userId, event.getValue());
        });

        Checkbox seeFollowingCheckbox = new Checkbox("Allow others to see who I am following");
        seeFollowingCheckbox.setValue(settingsService.canOthersSeeFollowing(userId));
        seeFollowingCheckbox.addValueChangeListener(event -> {
            settingsService.updateCanOthersSeeFollowing(userId, event.getValue());
        });
        layout.add(seeFollowersCheckbox, seeFollowingCheckbox);
        return layout;
    }

    private VerticalLayout createEmailLayout() {
        return new VerticalLayout();
    }

    private VerticalLayout createNotificationsLayout() {
        return new VerticalLayout();
    }

    private VerticalLayout createPreferencesLayout() {
        VerticalLayout layout = new VerticalLayout();

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

        layout.add(formLayout);
        return layout;
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

