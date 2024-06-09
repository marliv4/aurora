package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.UserInfoDisplayUtils;
import com.livajusic.marko.aurora.db_repos.FollowRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.FileService;
import com.livajusic.marko.aurora.services.FollowService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.BelongsTo;
import com.livajusic.marko.aurora.tables.GifCategory;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
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
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.File;
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

    public MyProfileView(
            UserService userService,
            ValuesService valuesService,
            UserRepo userRepo,
            FileService fileService,
            FollowService followService,
            GifRepo gifRepo) {
        this.userService = userService;
        this.valuesService = valuesService;
        this.userRepo = userRepo;
        this.fileService = fileService;
        this.followService = followService;
        this.gifRepo = gifRepo;

        NavigationBar navbar = new NavigationBar(valuesService, userService);
        add(navbar);

        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        final var username = userService.getCurrentUsername();
        final var userId = userService.getUserIdByUsername(username);

        UserInfoDisplayUtils userInfoDisplayUtils = new UserInfoDisplayUtils(gifRepo, userId, userService, followService);
        add(userInfoDisplayUtils.getInfoLayout());

        // Header
        Span header = new Span("My Profile");
        header.getStyle().set("font-size", "24px").set("font-weight", "bold");
        add(header);

        // Current profile picture
        Image profileImage = new Image("TODO", "Current Profile Picture");
        profileImage.setWidth("100px");
        profileImage.setHeight("100px");
        profileImage.getStyle().set("border-radius", "50%");
        add(profileImage);

        // Profile picture upload
        Span uploadLabel = new Span("Upload New Profile Picture:");
        MemoryBuffer buffer = new MemoryBuffer();
        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes("image/jpeg", "image/png", "image/gif");

        upload.addSucceededListener(event -> {
            InputStream inputStream = buffer.getInputStream();
            String endPath = valuesService.getProfilePicturesDirectory();
            System.out.println(endPath);

            saveFile(inputStream);
            // TODO
            // Files.copy(inputStream, Paths.get(endPath));
        });

        // New password field
        PasswordField newPasswordField = new PasswordField("New Password");
        newPasswordField.setPlaceholder("Enter new password");

        // Change password button
        Button changePasswordButton = new Button("Change Password");
        changePasswordButton.addClickListener(e -> {
            String newPassword = newPasswordField.getValue();
            if (newPassword.isEmpty()) {
                Notification.show("Please enter a new password");
            } else {
                changePassword(newPassword);
            }
        });

        // Layout for profile picture upload and password change
        FormLayout formLayout = new FormLayout();
        formLayout.add(uploadLabel, upload, newPasswordField, changePasswordButton);
        formLayout.setResponsiveSteps(new FormLayout.ResponsiveStep("0", 1));

        formLayout.getStyle()
                .set("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2)")
                .set("padding", "20px")
                .set("border-radius", "10px")
                .set("background-color", "#fff");

        // Container to center the form
        VerticalLayout formContainer = new VerticalLayout();
        formContainer.setWidth("400px"); // Fixed width for the form container
        formContainer.getStyle().set("margin", "auto");
        formContainer.add(formLayout);

        // Add the form container to the main layout
        add(formContainer);

        RadioButtonGroup<String> radioButtonGroup = new RadioButtonGroup<>();
        radioButtonGroup.setLabel("Privacy Settings");
        radioButtonGroup.setItems("Enabled", "Disabled");

        radioButtonGroup.addValueChangeListener(event -> {
            String selected = event.getValue().toLowerCase();
            System.out.println("Selected: " + selected);
            final var sessionUsername = userService.getCurrentUsername();
            int setting = 0;
            if (selected.equals("enabled")) {
                setting = 1;
            }
            userService.updateProfilePrivacy(sessionUsername, setting);
        });

        add(radioButtonGroup);
    }

    private void changePassword(String password) {
        final var uname = userService.getCurrentUsername();
        System.out.println(uname + " " + password);

        if (userService.updatePassword(uname, passwordEncoder.encode(password)) == 1) {
            Notification.show("Password updated successfully", 300, Notification.Position.BOTTOM_CENTER);
        }
    }

    public void saveFile(InputStream is) {
        System.out.println("saveFILE() pfp");
        // Check if directory with user's username exists
        File imagesDir = fileService.createDirIfNeeded(profilePicturesBasePath);

        String uname = userService.getCurrentUsername();
        File userSpecificDir = fileService.createDirIfNeeded(imagesDir + "/" + uname + "/");

        Optional<AuroraUser> currentUser = userRepo.findByUsername(uname);
        final var userEmpty = currentUser.isEmpty();

        if (userEmpty) {
            // Handle error
            return;
        }

        final var user = currentUser.get();

        final var filename = "pfp.jpg";
        System.out.println("FILENAME: " + filename);
        // AuroraGIF(String path, AuroraUser user, Date publishDate, String license)

        try {
            final var endPath = userSpecificDir + "/" + filename;
            System.out.println("endPATH: " + endPath);

            Files.copy(is, Paths.get(endPath));
        } catch (java.io.IOException e) {
            return;
        }
    }
}
