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
import com.livajusic.marko.aurora.db_repos.BelongsToRepo;
import com.livajusic.marko.aurora.db_repos.GifCategoryRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.*;
import com.livajusic.marko.aurora.tables.*;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.FileBuffer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Value;
import java.io.*;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@PageTitle("Upload")
@Route(value = "/upload")
@RolesAllowed("user")
public class UploadView extends VerticalLayout {
    private final GifRepo gifRepo;
    private final UserRepo userRepo;
    private final GifCategoryRepo gifCategoryRepo;
    private final BelongsToRepo belongsToRepo;
    private final UserService userService;
    private final FileService fileService;
    private final FollowService followService;

    @Value("${upload.directory}")
    private String basePath;

    private final GIFService gifService;

    public UploadView(GifRepo gifRepo,
                      UserRepo userRepo,
                      GifCategoryRepo gifCategoryRepo,
                      BelongsToRepo belongsToRepo,
                      UserService userService,
                      FileService fileService,
                      ProfilePictureService profilePictureService,
                      LanguagesController languagesController,
                      GIFService gifService,
                      SettingsService settingsService,
                      NotificationService notificationService,
                      FollowService followService) {
        this.gifRepo = gifRepo;
        this.userRepo = userRepo;
        this.gifCategoryRepo = gifCategoryRepo;
        this.belongsToRepo = belongsToRepo;
        this.userService = userService;
        this.fileService = fileService;
        this.gifService = gifService;
        this.followService = followService;

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
        add(navbar);

        Span fileLabel = new Span("Choose a file:");
        FileBuffer buffer = new FileBuffer();
        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes("image/gif");

        TextField categoryInput = new TextField();
        TextField description = new TextField();
        description.setValue("");
        add(fileLabel, upload);

        Button submitButton = new Button("Submit");
        submitButton.addClickListener(e -> {
            /*
            if (gifService.hasUserUploadedGIFInLastNMinutes(userService.getCurrentUserId(), 10)) {
                final var n = Notification.show("You uploaded a GIF in previous 10 minutes!", 1500, Notification.Position.MIDDLE);
                n.addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }
             */

            // Send all users who follow me a notification that I uploaded a GIF!
            // For that:
            // 1. Get users who follow me.
            final var userId = userService.getCurrentUserId();
            final List<Object[]> usersWhoFollowMe = followService.getUsersFollowers(userId);
            // For each user, insert a notification in the DB.
            for (Object[] entry : usersWhoFollowMe) {
                AuroraUser uploader = userService.getUserById(userId);
                AuroraUser intendedUser = (AuroraUser)entry[0];
                final var date = UploadView.AuroraDateManager.getSqlDate(UploadView.AuroraDateManager.getUtilDate());
                final var dateStr = UploadView.AuroraDateManager.getFormattedDate(date);
                String msg = String.format("%s has uploaded a new GIF on %s", uploader.getUsername(), dateStr);
                notificationService.save(/* uploader,*/ intendedUser, msg);
            }

            InputStream inputStream = buffer.getInputStream();
            saveFile(basePath, inputStream, description.getValue(), categoryInput.getValue());
            final var n = Notification.show("GIF successfully uploaded!", 1500, Notification.Position.MIDDLE);
            n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        });

        FormLayout formLayout = createFormLayout(categoryInput, description);

        VerticalLayout formContainer = new VerticalLayout();
        formContainer.setWidth("400px");
        formContainer.getStyle().set("margin", "auto");
        formContainer.add(formLayout, submitButton);

        add(formContainer);

        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
    }

    private FormLayout createFormLayout(TextField categoryInput, TextField descriptionInput) {
        FormLayout formLayout = new FormLayout();
        formLayout.addFormItem(categoryInput, "Categories (CSV)");
        formLayout.addFormItem(descriptionInput, "Description");
        formLayout.addClassName("register_form");
        return formLayout;
    }

    public void saveFile(String path, InputStream is, String description, String category) {
        String uname = userService.getCurrentUsername();

        Optional<AuroraUser> currentUser = userRepo.findByUsername(uname);
        final var userEmpty = currentUser.isEmpty();

        if (userEmpty) {
            return;
        }

        final var user = currentUser.get();

        final var utilDate = UploadView.AuroraDateManager.getUtilDate();
        LocalDateTime dateTime = LocalDateTime.parse(utilDate.toString(), DateTimeFormatter.ofPattern("EEE MMM dd HH:mm:ss zzz yyyy"));
        String time = dateTime.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        System.out.println(time);

        final var date = UploadView.AuroraDateManager.getSqlDate(utilDate);
        System.out.println(date);

        var f = date + "_" + time + "_" + user.getId() + ".gif";
        final byte[] imageData = fileService.getDataBytes(is);

        AuroraGIF gif = new AuroraGIF(
                imageData,
                user,
                date,
                description
        );
        gifRepo.save(gif);

        final var categories = Arrays.asList(category.split(","));
        if (categories.size() > 10) {
            return;
        }

        for (String c : categories) {
            System.out.println(c);
            GifCategory gifCategory;
            if (!fileService.categoryAlreadyExists(c)) {
                gifCategory = new GifCategory(c);
                gifCategoryRepo.save(gifCategory);
            } else {
                gifCategory = fileService.getCategory(c);
            }

            boolean exists = belongsToRepo.existsByGifAndCategory(gif, gifCategory);
            if (!exists) {
                BelongsTo belongsToEntry = new BelongsTo(gif, gifCategory);
                belongsToRepo.save(belongsToEntry);
            }
        }
    }

    public static class AuroraDateManager {
        public static java.util.Date getUtilDate() {
            return new java.util.Date();
        }

        public static java.sql.Date getSqlDate(java.util.Date utilDate) {
            return new java.sql.Date(utilDate.getTime());
        }

        public static String getFormattedDate(Date date) {
            LocalDate localDate = date.toLocalDate();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
            return localDate.format(formatter);
        }
    };
}