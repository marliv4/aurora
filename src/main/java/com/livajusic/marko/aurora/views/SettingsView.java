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
package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.services.*;
import com.livajusic.marko.aurora.views.dialogs.ChangePasswordDialog;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.shared.Tooltip;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.formlayout.FormLayout;
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
                        LanguagesController languagesController,
                        NotificationService notificationService) {
        this.settingsService = settingsService;
        this.userService = userService;
        this.languagesController = languagesController;
        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
        add(navbar);

        final Long userId = userService.getCurrentUserId();
        Tab accountTab = new Tab(languagesController.get("account"));
        Tab profileTab = new Tab(languagesController.get("profile"));
        Tab privacyTab = new Tab(languagesController.get("privacy"));
        Tab preferencesTab = new Tab(languagesController.get("preferences"));
        Tabs tabs = new Tabs(accountTab, profileTab, privacyTab, preferencesTab);
        tabs.setWidthFull();

        Map<Tab, VerticalLayout> tabsToLayouts = new HashMap<>();
        tabsToLayouts.put(accountTab, createAccountLayout());
        tabsToLayouts.put(profileTab, createProfileLayout());
        tabsToLayouts.put(privacyTab, createPrivacyLayout(userId));
        tabsToLayouts.put(preferencesTab, createPreferencesLayout());

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
        layout.add(new H3(languagesController.get("general")));
        final String email = userService.getEmail(userService.getCurrentUserId());

        layout.add(new H3(languagesController.get("email")), new Text(email));
        Button changePwBtn = new Button(languagesController.get("change_password"));
        changePwBtn.addClickListener(e -> {
            System.out.println("openChangePwDialogBtn");
            ChangePasswordDialog changePasswordDialog = new ChangePasswordDialog(userService);
            changePasswordDialog.open();
        });

        layout.add(new H3(languagesController.get("password")), changePwBtn);
        return layout;
    }

    private VerticalLayout createProfileLayout() {
        VerticalLayout layout = new VerticalLayout();

        String currentBio = userService.getBio(userService.getCurrentUserId());

        TextField bioField = new TextField();
        bioField.setValue(currentBio);
        layout.add(bioField);

        Button updateBioBtn = new Button(languagesController.get("update_bio"));
        updateBioBtn.addClickListener(e -> {
            String newBio = bioField.getValue();
            if (!currentBio.equals(newBio)) {
                userService.updateBio(userService.getCurrentUserId(), newBio);
                Notification.show(languagesController.get("bio_updated_successfully"), 1000, Notification.Position.TOP_CENTER);
                bioField.setValue(newBio);
            } else {
                final var n = Notification.show("You didn't change your bio!", 1000, Notification.Position.TOP_CENTER);
                n.addThemeVariants(NotificationVariant.LUMO_ERROR);
            }
        });
        layout.add(updateBioBtn);

        return layout;
    }

    private VerticalLayout createPrivacyLayout(Long userId) {
        VerticalLayout layout = new VerticalLayout();

        Checkbox seeFollowersCheckbox = new Checkbox(languagesController.get("allow_others_to_see_my_followers"));
        seeFollowersCheckbox.setValue(settingsService.canOthersSeeFollowers(userId));
        seeFollowersCheckbox.addValueChangeListener(event ->
                settingsService.updateCanOthersSeeFollowers(userId, event.getValue())
        );

        Checkbox seeFollowingCheckbox = new Checkbox(languagesController.get("allow_others_to_see_who_i_am_following"));
        seeFollowingCheckbox.setValue(settingsService.canOthersSeeFollowing(userId));
        seeFollowingCheckbox.addValueChangeListener(event ->
                settingsService.updateCanOthersSeeFollowing(userId, event.getValue())
        );

        Checkbox canOthersSeeWhatILikedSwitch = new Checkbox(languagesController.get("allow_others_to_see_what_i_liked"));
        canOthersSeeWhatILikedSwitch.setTooltipText(languagesController.get("liked_tooltip"));
        canOthersSeeWhatILikedSwitch.setValue(settingsService.canOthersSeeWhatILiked(userId));
        canOthersSeeWhatILikedSwitch.addValueChangeListener(event ->
                settingsService.updateCanOthersSeeWhatILiked(userId, event.getValue())
        );
        layout.add(seeFollowersCheckbox, seeFollowingCheckbox, canOthersSeeWhatILikedSwitch);
        return layout;
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
        final var lang = settingsService.getUsersLanguage(userId);
        languageSelect.setValue(lang.toString());
        languageSelect.addValueChangeListener(l -> {
            String selectedLanguage = l.getValue();
            LanguagesController.Language langUser = null;
            if (selectedLanguage.equals("English")) {
                langUser = LanguagesController.Language.English;
            } else {
                langUser = LanguagesController.Language.German;
            }
            languagesController.switchLanguage(langUser);
            settingsService.updateUsersLanguage(userId, selectedLanguage);
            final var n = Notification.show(languagesController.get("lang_not"));
            n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        });
        formLayout.addFormItem(languageSelect, languagesController.get("select_language"));
        layout.add(formLayout);
        return layout;
    }
}

