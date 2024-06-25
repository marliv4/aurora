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
import com.livajusic.marko.aurora.services.NotificationService;
import com.livajusic.marko.aurora.services.ProfilePictureService;
import com.livajusic.marko.aurora.services.SettingsService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.tables.NotificationModel;
import com.livajusic.marko.aurora.tables.ProfilePicture;
import com.livajusic.marko.aurora.views.dialogs.NotificationsDialog;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.Autocomplete;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.theme.lumo.Lumo;

import java.io.ByteArrayInputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@StyleSheet("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap")
// @CssImport("styles.css")
public class NavigationBar extends HorizontalLayout {
    private final UserService userService;
    private final NotificationService notificationService;
    private final SettingsService settingsService;
    private final LanguagesController languagesController;
    private boolean dark = true;

    private ComboBox<String> searchComboBox;

    public NavigationBar(UserService userService,
                         ProfilePictureService profilePictureService,
                         LanguagesController languagesController,
                         SettingsService settingsService,
                         NotificationService notificationService) {
        this.userService = userService;
        this.notificationService = notificationService;
        this.settingsService = settingsService;
        this.languagesController = languagesController;

        setAlignItems(HorizontalLayout.Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
        addClassName("navbar");
        setWidthFull();

        RouterLink homeLink = new RouterLink(languagesController.get("home"), HomeView.class);
        RouterLink registerLink = new RouterLink(languagesController.get("register"), RegisterView.class);
        RouterLink loginLink = new RouterLink(languagesController.get("login"), LoginView.class);
        RouterLink publishLink = new RouterLink(languagesController.get("upload"), UploadView.class);

        boolean addRegisterAndLoginLink = true;
        MenuBar profileMenu = new MenuBar();

        if (userService.isLoggedIn()) {
            final var userId = userService.getCurrentUserId();
            final var pfpOptional = profilePictureService.getPfpByUserId(userId);
            Image profileImage = getImage(profilePictureService, pfpOptional);
            profileImage.getStyle().set("border-radius", "50%");

            MenuItem profileMenuItem = profileMenu.addItem(profileImage);
            profileMenuItem.getSubMenu().addItem(languagesController.get("my_profile"), e -> navigateToProfile());
            profileMenuItem.getSubMenu().addItem(languagesController.get("settings"), e -> navigateToSettings());
            profileMenuItem.getSubMenu().addItem(languagesController.get("create"), e -> navigateToCreate());
            profileMenuItem.getSubMenu().addItem(languagesController.get("logout"), e -> {
                userService.logout();
                getUI().get().getPage().reload();
            });
            addRegisterAndLoginLink = false;

            dark = settingsService.getUsersTheme(userId).equals("Dark");
            changeTheme();
        }
        add(profileMenu);

        Optional<Button> notificationButton = getNotificationButton();
        Button themeToggleButton = getThemeTogglingButton();
        add(themeToggleButton);

        final var userSearch = createUserSearchField();

        if (addRegisterAndLoginLink) {
            add(/* logo, */ homeLink, registerLink, loginLink, publishLink, /* searchField, */ profileMenu, userSearch);
        } else {
            add(/* logo, */ homeLink, publishLink, /* searchField, */ profileMenu, notificationButton.get(), userSearch);
        }
        setSpacing(true);
    }

    private Optional<Button> getNotificationButton() {
        if (!userService.isLoggedIn()) {
            return Optional.empty();
        }

        Icon bellIcon = VaadinIcon.BELL.create();
        Button notificationButton = new Button(bellIcon);
        notificationButton.addThemeVariants(ButtonVariant.LUMO_ICON, ButtonVariant.LUMO_TERTIARY);

        final var userId = userService.getCurrentUserId();
        final List<NotificationModel> notifications = notificationService.getNotificationsForUser(userId);
        if (!notifications.isEmpty()) {
            bellIcon.setColor("red");
            notificationButton.addClickListener(e -> createNotificationLayout(notifications, userId));
        } else {
            bellIcon.setColor("badge error pill");
        }

        return Optional.of(notificationButton);
    }

    private void createNotificationLayout(List<NotificationModel> notificationModels, Long userId) {
        NotificationsDialog notificationsDialog = new NotificationsDialog();
        for (NotificationModel notification : notificationModels) {
            Div notificationDiv = new Div();
            notificationDiv.getStyle()
                    .set("border", "1px solid #ccc")
                    .set("border-radius", "5px")
                    .set("padding", "10px")
                    .set("margin-bottom", "10px")
                    .set("box-shadow", "0 2px 4px rgba(0, 0, 0, 0.1)");
            System.out.println(notification.getMessage());
            Span notificationItem = new Span(notification.getMessage());
            notificationItem.addClickListener(l -> {
                UI.getCurrent().navigate(String.format("/profile/%s", userService.getUsernameById(userId)));
                notificationsDialog.close();
            });
            Button markAsReadButton = getMarkAsReadButton(notification, notificationsDialog, notificationDiv);

            notificationDiv.add(notificationItem, markAsReadButton);
            notificationsDialog.addComponentToDialog(notificationDiv);
            notificationsDialog.open();
        }
    }

    private Button getMarkAsReadButton(NotificationModel notification,
                                       NotificationsDialog notificationsDialog,
                                       Component component) {
        Button markAsReadButton = new Button(languagesController.get("mark_as_read"));
        markAsReadButton.addClickListener(event -> {
            notificationsDialog.removeComponentFromDialog(component);
            notificationService.delete(notification.getId());
            // Close if no remaining notifications.
            if (notificationService.countNotificationIntendedForUser(userService.getCurrentUserId()) == 0) {
                notificationsDialog.close();
            }
        });
        return markAsReadButton;
    }


    private Button getThemeTogglingButton() {
        Button themeToggleButton = new Button(new Icon(VaadinIcon.MOON));
        themeToggleButton.addClickListener(event -> {
            Icon currentIcon = (Icon) themeToggleButton.getIcon();
            char theme = ' ';
            if (currentIcon.getElement().getAttribute("icon").equals(VaadinIcon.MOON.create().getElement().getAttribute("icon"))) {
                theme = 'l';
                dark = false;
                themeToggleButton.setIcon(new Icon(VaadinIcon.SUN_DOWN));
            } else {
                theme = 'd';
                dark = true;
                themeToggleButton.setIcon(new Icon(VaadinIcon.MOON));
            }

            if (userService.isLoggedIn()) {
                settingsService.updateUsersTheme(userService.getCurrentUserId(), theme);
            }
            changeTheme();
        });
        return themeToggleButton;
    }

    private static Image getImage(ProfilePictureService profilePictureService, Optional<ProfilePicture> pfpOptional) {
        StreamResource resource;
        if (pfpOptional.isPresent()) {
            final var pfp = pfpOptional.get();
            resource = new StreamResource("profile-picture", () -> new ByteArrayInputStream(pfp.getImageData()));
        } else {
            resource = new StreamResource("profile-picture", () -> new ByteArrayInputStream(profilePictureService.getDefaultPfpBytes()));
        }
        Image profileImage = new Image(resource, "Profile Picture");
        profileImage.setWidth("30px");
        profileImage.setHeight("30px");
        return profileImage;
    }

    private void showSimilarUsername(String similarUsername) {
        final var n = Notification.show(String.format("Do you mean: %s", similarUsername), 3000, Notification.Position.MIDDLE);
        n.addThemeVariants(NotificationVariant.LUMO_PRIMARY);
    }

    private TextField createUserSearchField() {
        TextField searchField = new TextField();
        searchField.setPlaceholder(languagesController.get("search_for_users"));
        searchField.setAutocomplete(Autocomplete.OFF);
        searchField.setValueChangeMode(ValueChangeMode.EAGER);
        searchField.addKeyPressListener(Key.ENTER, e -> userService.searchForUser(searchField.getValue()));

        Set<String> shownUsernames = new HashSet<>();

        searchField.addValueChangeListener(l -> {
            final var val = searchField.getValue();
            if (val != null && !val.isEmpty()) {
                // don't show same usernames multiple times
                List<String> similarUsernames = userService.getSimilarUsernames(val);
                List<String> newNamesToShow = similarUsernames.stream()
                        .filter(username -> !shownUsernames.contains(username))
                        .toList();

                newNamesToShow.forEach(this::showSimilarUsername);
                shownUsernames.addAll(newNamesToShow);
            }
        });
        return searchField;
    }

    private void navigateToProfile() {
        UI.getCurrent().navigate(MyProfileView.class);
    }

    private void navigateToSettings() {
        // RouteConfiguration.forSessionScope().setRoute("settings", SettingsView.class);
        UI.getCurrent().navigate("settings");
    }

    private void navigateToCreate() {
        // RouteConfiguration.forSessionScope().setRoute("create", SettingsView.class);
        UI.getCurrent().navigate("create");
    }

    private void changeTheme() {
        var js = "document.documentElement.setAttribute('theme', $0)";
        getElement().executeJs(js, dark ? Lumo.DARK : Lumo.LIGHT);
    }
}
