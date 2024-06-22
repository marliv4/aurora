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
import com.livajusic.marko.aurora.UserInfoDisplayUtils;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.*;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.sun.jna.platform.win32.Netapi32Util;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import org.hibernate.sql.ast.tree.insert.Values;

import java.util.ArrayList;
import java.util.List;

@PageTitle("Main")
@Route(value = "/profile")
@AnonymousAllowed
public class UserProfileView extends Div implements HasUrlParameter<String> {
    private H3 usernameText;
    private String username;

    private final UserService userService;
    private final FollowService followService;

    private final SettingsService settingsService;
    private final GifRepo gifRepo;
    private final GIFDisplayService gifDisplayService;

    List<Component> componentsToDelete = new ArrayList<Component>();

    public UserProfileView(UserService userService,
                           FollowService followService,
                           ProfilePictureService profilePictureService,
                           LanguagesController languagesController,
                           SettingsService settingsService,
                           GifRepo gifRepo,
                           GIFDisplayService gifDisplayService,
                           NotificationService notificationService) {
        clearUserProfile();
        this.userService = userService;
        this.settingsService = settingsService;
        this.followService = followService;
        this.gifRepo = gifRepo;
        this.gifDisplayService = gifDisplayService;
        usernameText = new H3();

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
        add(navbar);
        if (userService.isLoggedIn()) {
            Button button = new Button("Follow");
            button.addClickListener(e -> {
                followUser();
            });
            add(button);
        }

        componentsToDelete.add(usernameText);
    }

    private void followUser() {
        System.out.println("followUser");
        System.out.println("username: " + username);

        final var followedUserId = userService.getUserIdByUsername(username);
        long getCurrentSessionsUserId = userService.getUserIdByUsername(userService.getCurrentUsername());
        followService.followUser(getCurrentSessionsUserId, followedUserId);
    }

    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        loadUserProfile(parameter);
    }

    private void loadUserProfile(String username) {
        System.out.println("loadUserProfile");
        this.username = username;
        add(usernameText);

        usernameText.setText("Profile of user: " + username);

        final var userId = userService.getUserIdByUsername(username);
        UserInfoDisplayUtils userInfoDisplayUtils = new UserInfoDisplayUtils(gifRepo, userId, userService, followService, settingsService);
        add(userInfoDisplayUtils.getInfoLayout());

        componentsToDelete.add(userInfoDisplayUtils.getInfoLayout());
        componentsToDelete.add(userInfoDisplayUtils.getFollowersSpan());

        // gifsLayout.addClassName("user-gifs-layout");
        VerticalLayout gifsLayout = new VerticalLayout();
        add(gifsLayout);
        componentsToDelete.add(gifsLayout);

        List<AuroraGIF> gifs = gifRepo.findAllByUserId(userId);
        for (AuroraGIF gif : gifs) {
            Div gifDiv = gifDisplayService.displaySingleGif(username, gif);
            add(gifDiv);
            componentsToDelete.add(gifDiv);
        }
    }

    private void clearUserProfile() {
        System.out.println("clearUserProfile");
        for (Component d : componentsToDelete) {
            remove(d);
        }
        componentsToDelete.clear();
        // UI.getCurrent().getPage().reload();
    }
}
