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
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.component.UI;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Optional;

@StyleSheet("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap")
// @CssImport("styles.css")
public class NavigationBar extends HorizontalLayout {
    private final UserService userService;
    private final NotificationService notificationService;

    public NavigationBar(UserService userService,
                         ProfilePictureService profilePictureService,
                         LanguagesController languagesController,
                         SettingsService settingsService,
                         NotificationService notificationService) {
        this.userService = userService;
        this.notificationService = notificationService;

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
            profileMenuItem.getSubMenu().addItem(languagesController.get("myprofile"), e -> navigateToProfile());
            profileMenuItem.getSubMenu().addItem(languagesController.get("settings"), e -> navigateToSettings());
            profileMenuItem.getSubMenu().addItem(languagesController.get("create"), e -> navigateToCreate());
            profileMenuItem.getSubMenu().addItem(languagesController.get("logout"), e -> {
                userService.logout();
                getUI().get().getPage().reload();
            });
            addRegisterAndLoginLink = false;
        }
        add(profileMenu);

        Button notificationButton = getNotificationButton();

        Button themeToggleButton = getThemeTogglingButton();
        add(themeToggleButton);

        TextField userSearch = createUserSearchField();

        if (addRegisterAndLoginLink) {
            add(/* logo, */ homeLink, registerLink, loginLink, publishLink, /* searchField, */ profileMenu, userSearch);
        } else {
            add(/* logo, */ homeLink, publishLink, /* searchField, */ profileMenu, notificationButton, userSearch);
        }

        setSpacing(true);
    }

    private Button getNotificationButton() {
        Icon bellIcon = VaadinIcon.BELL.create();
        Button notificationButton = new Button(bellIcon);
        notificationButton.addThemeVariants(ButtonVariant.LUMO_ICON, ButtonVariant.LUMO_TERTIARY);

        notificationButton.addClickListener(e -> {
            createNotificationLayout();
        });

        return notificationButton;
    }

    private void createNotificationLayout() {
        final var userId = userService.getCurrentUserId();
        final List<NotificationModel> notifications = notificationService.getNotificationsForUser(userId);

        if (notifications.isEmpty()) {
            final var n = Notification.show("No notifications!", 1500, Notification.Position.MIDDLE);
            n.addThemeVariants(NotificationVariant.LUMO_PRIMARY);
        } else {
            NotificationsDialog notificationsDialog = new NotificationsDialog();
            for (NotificationModel notification : notifications) {
                System.out.println(notification.getMessage());
                Span notificationItem = new Span(notification.getMessage());
                notificationsDialog.addComponentToDialog(notificationItem);

                Button markAsReadButton = new Button("Mark as Read");
                markAsReadButton.addClickListener(event -> {
                    notification.setRead(true);
                    // TODO: Delete notification from DB once read.
                    notificationService.delete(notification.getId());
                    notificationsDialog.close();
                });

                notificationsDialog.addComponentToDialog(notificationItem);
                notificationsDialog.addComponentToDialog(markAsReadButton);
                notificationsDialog.open();
            }
        }

        /*
        notificationLayout.setVisible(false);
        add(notificationLayout);
        return notificationLayout;
        */
    }


    private static Button getThemeTogglingButton() {
        Button themeToggleButton = new Button(new Icon(VaadinIcon.MOON));
        themeToggleButton.addClickListener(event -> {
            Icon currentIcon = (Icon) themeToggleButton.getIcon();
            if (currentIcon.getElement().getAttribute("icon").equals(VaadinIcon.MOON.create().getElement().getAttribute("icon"))) {
                // TODO: update DB entry
                themeToggleButton.setIcon(new Icon(VaadinIcon.SUN_DOWN));
            } else {
                themeToggleButton.setIcon(new Icon(VaadinIcon.MOON));
            }
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

    private TextField createUserSearchField() {
        TextField searchField = new TextField();
        searchField.setPlaceholder("Search users");
        searchField.addKeyPressListener(Key.ENTER, e -> userService.searchForUser(searchField.getValue()));

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
}
