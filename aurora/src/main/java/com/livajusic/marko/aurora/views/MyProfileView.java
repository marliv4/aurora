package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.UserInfoDisplayUtils;
import com.livajusic.marko.aurora.db_repos.FollowRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.ProfilePictureRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.*;
import com.livajusic.marko.aurora.tables.*;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAccessDeniedError;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.StreamResource;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Optional;

@PageTitle("My Profile")
@Route(value = "my_profile")
@RolesAllowed("user")
public class MyProfileView extends VerticalLayout {

    private final UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final ValuesService valuesService;

    @Value("${upload.profilepictures.directory}")
    private String profilePicturesBasePath;

    private final UserRepo userRepo;

    private final FileService fileService;

    private final FollowService followService;

    private final GifRepo gifRepo;
    private final ProfilePictureService profilePictureService;

    public MyProfileView(
            UserService userService,
            ValuesService valuesService,
            UserRepo userRepo,
            FileService fileService,
            FollowService followService,
            GifRepo gifRepo,
            LanguagesController languagesController,
            ProfilePictureService profilePictureService) {
        this.userService = userService;
        this.valuesService = valuesService;
        this.userRepo = userRepo;
        this.fileService = fileService;
        this.followService = followService;
        this.gifRepo = gifRepo;
        this.profilePictureService = profilePictureService;

        NavigationBar navbar = new NavigationBar(valuesService, userService, profilePictureService, languagesController);
        add(navbar);

        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        final var username = userService.getCurrentUsername();
        final var userId = userService.getUserIdByUsername(username);

        UserInfoDisplayUtils userInfoDisplayUtils = new UserInfoDisplayUtils(gifRepo, userId, userService, followService);
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

        Span uploadLabel = new Span("Upload New Profile Picture:");
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
