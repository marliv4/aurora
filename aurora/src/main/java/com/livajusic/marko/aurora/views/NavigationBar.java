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
import com.livajusic.marko.aurora.services.ProfilePictureService;
import com.livajusic.marko.aurora.services.SettingsService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.tables.ProfilePicture;
import com.livajusic.marko.aurora.views.LoginView;
import com.livajusic.marko.aurora.views.RegisterView;
import com.livajusic.marko.aurora.views.UploadView;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.livajusic.marko.aurora.views.HomeView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.RouteConfiguration;
import org.aspectj.apache.bcel.generic.SwitchBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.context.MessageSource;
import org.springframework.web.servlet.LocaleResolver;

import java.io.ByteArrayInputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Stream;

@StyleSheet("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap")
// @CssImport("styles.css")
public class NavigationBar extends HorizontalLayout {
    private final UserService userService;
    private final ProfilePictureService profilePictureService;
    private LanguagesController languagesController;
    private final SettingsService settingsService;

    public NavigationBar(UserService userService,
                         ProfilePictureService profilePictureService,
                         LanguagesController languagesController,
                         SettingsService settingsService) {
        this.userService = userService;
        this.profilePictureService = profilePictureService;
        this.languagesController = languagesController;
        this.settingsService = settingsService;

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

        Button themeToggleButton = new Button(new Icon(VaadinIcon.MOON));
        themeToggleButton.getElement().

                getStyle().

                set("background-color", "#1c1f2b");
        themeToggleButton.getElement().

                getStyle().

                set("border", "none");
        themeToggleButton.getElement().

                getStyle().

                set("border-radius", "50%");
        themeToggleButton.getElement().

                getStyle().

                set("width", "40px");
        themeToggleButton.getElement().

                getStyle().

                set("height", "40px");
        themeToggleButton.getElement().

                getStyle().

                set("display", "flex");
        themeToggleButton.getElement().

                getStyle().

                set("align-items", "center");
        themeToggleButton.getElement().

                getStyle().

                set("justify-content", "center");
        themeToggleButton.getElement().

                getStyle().

                set("color", "white");
        themeToggleButton.getElement().

                getStyle().

                set("cursor", "pointer");

        themeToggleButton.addClickListener(event ->

        {
            Icon currentIcon = (Icon) themeToggleButton.getIcon();
            if (currentIcon.getElement().getAttribute("icon").equals(VaadinIcon.MOON.create().getElement().getAttribute("icon"))) {
                themeToggleButton.setIcon(new Icon(VaadinIcon.SUN_DOWN));
            } else {
                themeToggleButton.setIcon(new Icon(VaadinIcon.MOON));
            }
        });

        add(themeToggleButton);

        TextField userSearch = createUserSearchField();

        if (addRegisterAndLoginLink) {
            add(/* logo, */ homeLink, registerLink, loginLink, publishLink, /* searchField, */ profileMenu, userSearch);
        } else {
            add(/* logo, */ homeLink, publishLink, /* searchField, */ profileMenu, userSearch);
        }

        setSpacing(true);

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
