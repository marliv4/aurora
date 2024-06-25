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
import com.livajusic.marko.aurora.tables.NotificationModel;
import com.livajusic.marko.aurora.tables.ProfilePicture;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@PageTitle("Main")
@Route(value = "/profile")
@AnonymousAllowed
public class UserProfileView extends Div implements HasUrlParameter<String> {
    private final H3 usernameText;
    private String username;
    private final UserService userService;
    private final FollowService followService;
    private final SettingsService settingsService;
    private final GifRepo gifRepo;
    private final GIFDisplayService gifDisplayService;
    private UserInfoDisplayUtils userInfoDisplayUtils;
    private final LanguagesController languagesController;
    private final ProfilePictureService profilePictureService;
    private final NotificationService notificationService;

    private com.vaadin.flow.component.textfield.TextField msgInput;

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
        this.languagesController = languagesController;
        this.profilePictureService = profilePictureService;
        this.notificationService = notificationService;
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

    private Text createBio(Long userId) {
        return new Text(userService.getBio(userId));
    }


    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        loadUserProfile(parameter);
    }

    private void loadUserProfile(String username) {
        this.username = username;

        VerticalLayout mainLayout = new VerticalLayout();
        mainLayout.setDefaultHorizontalComponentAlignment(FlexComponent.Alignment.CENTER);
        mainLayout.setWidthFull();
        mainLayout.getStyle().set("margin", "0 auto");

        usernameText.setText(languagesController.get("profile_of_user") + ": " + username);
        mainLayout.add(usernameText);

        final var targetUserId = userService.getUserIdByUsername(username).get();
        Text bio = createBio(targetUserId);
        mainLayout.add(bio);

        Optional<ProfilePicture> targetUserPfpOptional = profilePictureService.getPfpByUserId(targetUserId);
        if (targetUserPfpOptional.isEmpty()) {
            Notification.show("Error!", 1000, Notification.Position.TOP_CENTER);
            // return;
        } else {
            Image pfp = gifDisplayService.getImage(targetUserPfpOptional.get().getImageData());
            pfp.setWidth("100px");
            pfp.setHeight("100px");
            pfp.getStyle().set("border-radius", "50%");
            mainLayout.add(pfp);
        }

        userInfoDisplayUtils = new UserInfoDisplayUtils(gifRepo, targetUserId, userService, followService, settingsService, gifDisplayService, languagesController);
        mainLayout.add(userInfoDisplayUtils.getInfoLayout());
        componentsToDelete.add(userInfoDisplayUtils.getInfoLayout());

        if (userService.isLoggedIn()) {
            final Long userId = userService.getCurrentUserId();
            boolean imFollowingHimAlready = followService.isFollowing(userId, targetUserId);
            Button button = getFollowButton(imFollowingHimAlready, userId, targetUserId);

            msgInput = new com.vaadin.flow.component.textfield.TextField(languagesController.get("message"));
            Button msgUserBtn = getMessageBtn();
            HorizontalLayout messageLayout = new HorizontalLayout();
            messageLayout.setAlignItems(FlexComponent.Alignment.BASELINE);
            messageLayout.add(msgInput, msgUserBtn);

            mainLayout.add(button, messageLayout);
            componentsToDelete.add(button);
        }

        VerticalLayout gifsLayout = new VerticalLayout();
        mainLayout.add(gifsLayout);
        componentsToDelete.add(gifsLayout);

        final List<Object[]> gifsObjs = userService.findAllByUserIdAndPfp(targetUserId);
        for (Object[] gifObj : gifsObjs) {
            final AuroraGIF gif = (AuroraGIF) gifObj[0];
            final byte[] pfpBytes = (byte[]) gifObj[1];
            Div gifDiv = gifDisplayService.displaySingleGif(username, gif, pfpBytes);
            mainLayout.add(gifDiv);
            componentsToDelete.add(gifDiv);
        }
        add(mainLayout);
    }

    private Button getMessageBtn() {
        Button btn = new Button(languagesController.get("message"));
        btn.addClickListener(l -> {
            final var oCurrentUser = userService.getCurrentUser();
            final var oIntendedUser = userService.getUserByUsername(username);

            if (oCurrentUser.isEmpty() || oIntendedUser.isEmpty()) {
                final var n = Notification.show("Couldn't find user!", 1000, Notification.Position.TOP_CENTER);
                n.addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }

            final var currentUser = oCurrentUser.get();
            final var intendedUser = oIntendedUser.get();

            String msg = String.format("%s says: %s", currentUser.getUsername(), msgInput.getValue());
            notificationService.save(intendedUser, msg);
        });
        return btn;
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
