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
import com.livajusic.marko.aurora.services.*;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import java.util.ArrayList;
import java.util.List;

@PageTitle("Main")
@Route(value = "/profile")
@AnonymousAllowed
public class UserProfileView extends Div implements HasUrlParameter<String> {
    private final H3 usernameText;
    private final UserService userService;
    private final FollowService followService;
    private final SettingsService settingsService;
    private final GifRepo gifRepo;
    private final GIFDisplayService gifDisplayService;
    private UserInfoDisplayUtils userInfoDisplayUtils;

    List<Component> componentsToDelete = new ArrayList<>();

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
        componentsToDelete.add(usernameText);
    }

    private Button getFollowButton(boolean imFollowingHimAlready, Long currentUserId, Long targetUserId) {
        Button button = new Button(imFollowingHimAlready ? "Unfollow" : "Follow");
        final class FollowState {
            boolean isFollowing;

            FollowState(boolean isFollowing) {
                this.isFollowing = isFollowing;
            }
        }

        FollowState followState = new FollowState(imFollowingHimAlready);
        button.addClickListener(e -> {
            if (followState.isFollowing) {
                followService.unfollowUser(currentUserId, targetUserId);
                button.setText("Follow");
            } else {
                followService.followUser(currentUserId, targetUserId);
                button.setText("Unfollow");
            }
            followState.isFollowing = !followState.isFollowing;
        });

        return button;
    }


    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        loadUserProfile(parameter);
    }

    private void loadUserProfile(String username) {
        add(usernameText);
        usernameText.setText("Profile of user: " + username);

        final var targetUserId = userService.getUserIdByUsername(username).get();
        userInfoDisplayUtils = new UserInfoDisplayUtils(gifRepo, targetUserId, userService, followService, settingsService, gifDisplayService);
        add(userInfoDisplayUtils.getInfoLayout());
        componentsToDelete.add(userInfoDisplayUtils.getInfoLayout());

        if (userService.isLoggedIn()) {
            final Long userId = userService.getCurrentUserId();
            boolean imFollowingHimAlready = followService.isFollowing(userId, targetUserId);
            Button button = getFollowButton(imFollowingHimAlready, userId, targetUserId);
            add(button);
            componentsToDelete.add(button);
        }

        VerticalLayout gifsLayout = new VerticalLayout();
        add(gifsLayout);
        componentsToDelete.add(gifsLayout);

        final List<Object[]> gifsObjs = userService.findAllByUserIdAndPfp(targetUserId);
        for (Object[] gifObj : gifsObjs) {
            final AuroraGIF gif = (AuroraGIF) gifObj[0];
            final byte[] pfpBytes = (byte[]) gifObj[1];
            Div gifDiv = gifDisplayService.displaySingleGif(username, gif, pfpBytes);
            add(gifDiv);
            componentsToDelete.add(gifDiv);
        }
    }

    private void clearUserProfile() {
        System.out.println("clearUserProfile");
        for (Component d : componentsToDelete) {
            System.out.println(d.getId().get());
            remove(d);
        }
        componentsToDelete.clear();
        // userInfoDisplayUtils.delete();
    }
}
