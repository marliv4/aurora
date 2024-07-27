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
import com.livajusic.marko.aurora.tables.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@PageTitle("My Profile")
@Route(value = "my_profile")
@RolesAllowed("user")
public class MyProfileView extends VerticalLayout {

    private final UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserRepo userRepo;
    private final ProfilePictureService profilePictureService;
    private final GIFDisplayService gifDisplayService;
    private final LikeService likeService;
    private VerticalLayout gifsLayout;

    public MyProfileView(
            UserService userService,
            UserRepo userRepo,
            FollowService followService,
            GifRepo gifRepo,
            LanguagesController languagesController,
            ProfilePictureService profilePictureService,
            SettingsService settingsService,
            GIFDisplayService gifDisplayService,
            NotificationService notificationService,
            LikeService likeService) {
        this.userService = userService;
        this.userRepo = userRepo;
        this.profilePictureService = profilePictureService;
        this.gifDisplayService = gifDisplayService;
        this.likeService = likeService;

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
        add(navbar);

        setDefaultHorizontalComponentAlignment(Alignment.CENTER);
        setWidthFull();
        getStyle().set("margin", "0 auto");

        final var username = userService.getCurrentUsername();
        final var userId = userService.getUserIdByUsername(username).get();

        UserInfoDisplayUtils userInfoDisplayUtils = new UserInfoDisplayUtils(gifRepo, userId, userService, followService, settingsService, gifDisplayService, languagesController);
        add(userInfoDisplayUtils.getInfoLayout());

        Span header = new Span(languagesController.get("my_profile") + ": " + username);
        header.getStyle().set("font-size", "24px").set("font-weight", "bold");
        add(header);

        Optional<ProfilePicture> pfpOptional;
        if (profilePictureService.userHasPfp(userId)) {
            pfpOptional = profilePictureService.getPfpByUserId(userId);
            if (pfpOptional.isPresent()) {
                final var pfp = pfpOptional.get();
                StreamResource resource = new StreamResource("Profile Picture",
                        () -> new ByteArrayInputStream(pfp.getImageData()));

                Image profileImage = new Image(resource, "Current Profile Picture");
                profileImage.setWidth("100px");
                profileImage.setHeight("100px");
                profileImage.getStyle().set("border-radius", "50%");
                add(profileImage);
            }
        } else {
            pfpOptional = null;
        }

        MemoryBuffer buffer = new MemoryBuffer();
        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes("image/jpeg", "image/png", "image/gif");

        upload.addSucceededListener(event -> {
            InputStream inputStream = buffer.getInputStream();
            savePfp(inputStream);
        });
        add(upload);

        Tab usersPostsTab = new Tab(languagesController.get("posts"));
        Tab likedPostsTab = new Tab(languagesController.get("liked"));

        Tabs tabs = new Tabs(usersPostsTab, likedPostsTab);
        tabs.setSelectedTab(usersPostsTab);
        tabs.setWidthFull();
        add(tabs);

        gifsLayout = new VerticalLayout();
        gifsLayout.setDefaultHorizontalComponentAlignment(Alignment.CENTER);
        gifsLayout.setWidth("80%");
        gifsLayout.getStyle().set("align-items", "center");
        add(gifsLayout);

        tabs.addSelectedChangeListener(event -> {
            gifsLayout.removeAll();
            Tab selectedTab = event.getSelectedTab();
            if (selectedTab.equals(usersPostsTab)) {
                displayGifs(userId, gifsLayout);
            } else if (selectedTab.equals(likedPostsTab)) {
                displayLikedGifs(username, userId, pfpOptional.get().getImageData());
            }
        });

        displayGifs(userId, gifsLayout);
    }

    private void displayLikedGifs(String username, Long userId, byte[] pfpBytes) {
        final List<AuroraGIF> gifs = likeService.getPostsUserLiked(userId);
        if (gifs != null && !gifs.isEmpty())
            for (AuroraGIF gif : gifs) {
                Div gifDiv = gifDisplayService.displaySingleGif(username, gif, pfpBytes);
                gifsLayout.add(gifDiv);
            }
    }

    private void displayGifs(Long userId, VerticalLayout gifsLayout) {
        final List<Object[]> gifs = userService.findAllByUserIdAndPfp(userId);
        for (Object[] o : gifs) {
            final var gif = (AuroraGIF) o[0];
            final byte[] pfp = (byte[]) o[1];
            Div gifDiv = gifDisplayService.displaySingleGif(userService.getCurrentUsername(), gif, pfp);
            gifsLayout.add(gifDiv);
        }
    }

    public void savePfp(InputStream is) {
        String uname = userService.getCurrentUsername();
        Optional<AuroraUser> currentUser = userRepo.findByUsername(uname);
        final var userEmpty = currentUser.isEmpty();

        if (userEmpty) {
            final var n = Notification.show("Error: User can't be empty!", 300, Notification.Position.MIDDLE);
            n.addThemeVariants(NotificationVariant.LUMO_ERROR);
            return;
        }

        final var user = currentUser.get();
        try {
            profilePictureService.savePfp(is, user);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
    }
}
