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
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
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
import java.util.Optional;

@PageTitle("My Profile")
@Route(value = "my_profile")
@RolesAllowed("user")
public class MyProfileView extends VerticalLayout {

    private final UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final UserRepo userRepo;

    private final FileService fileService;

    private final FollowService followService;

    private final GifRepo gifRepo;
    private final ProfilePictureService profilePictureService;

    public MyProfileView(
            UserService userService,
            UserRepo userRepo,
            FileService fileService,
            FollowService followService,
            GifRepo gifRepo,
            LanguagesController languagesController,
            ProfilePictureService profilePictureService,
            SettingsService settingsService) {
        this.userService = userService;
        this.userRepo = userRepo;
        this.fileService = fileService;
        this.followService = followService;
        this.gifRepo = gifRepo;
        this.profilePictureService = profilePictureService;

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService);
        add(navbar);

        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        final var username = userService.getCurrentUsername();
        final var userId = userService.getUserIdByUsername(username);

        UserInfoDisplayUtils userInfoDisplayUtils = new UserInfoDisplayUtils(gifRepo, userId, userService, followService, settingsService);
        add(userInfoDisplayUtils.getInfoLayout());

        Span header = new Span(languagesController.get("my_profile"));
        header.getStyle().set("font-size", "24px").set("font-weight", "bold");
        add(header);

        if (profilePictureService.userHasPfp(userId)) {
            final var pfpOptional = profilePictureService.getPfpByUserId(userId);
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
        }

        MemoryBuffer buffer = new MemoryBuffer();
        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes("image/jpeg", "image/png", "image/gif");

        upload.addSucceededListener(event -> {
            InputStream inputStream = buffer.getInputStream();
            savePfp(inputStream);
        });
        add(upload);
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
