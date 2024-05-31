package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.BelongsTo;
import com.livajusic.marko.aurora.tables.GifCategory;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAccessDeniedError;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Autowired
    UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final ValuesService valuesService;

    @Value("${upload.profilepictures.directory}")
    private String profilePicturesBasePath;

    private final UserRepo userRepo;

    public MyProfileView(ValuesService valuesService, UserRepo userRepo) {
        this.valuesService = valuesService;
        this.userRepo = userRepo;

        NavigationBar navbar = new NavigationBar(valuesService, userService);
        add(navbar);

        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

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
    }

    private void changePassword(String password) {
        final var uname = userService.getCurrentUsername();
        System.out.println(uname + " " + password);

        if (userService.updatePassword(uname, passwordEncoder.encode(password)) == 1) {
            Notification.show("Password updated successfully", 300, Notification.Position.BOTTOM_CENTER);
        }
    }

    public void saveFile(InputStream is, String license, String category) {
        // Check if directory with user's username exists
        File imagesDir = new File(profilePicturesBasePath);
        if (!imagesDir.exists()) {
            System.out.println("/profilepictures/ folder not existing, creating it...");
            if (imagesDir.mkdirs()) {
                System.out.println("Created /profilepictures/ successfully.");
            }
        }

        String uname = userService.getCurrentUsername();
        File userSpecificDir = new File(imagesDir + "/" + uname + "/");

        if (!userSpecificDir.exists()) {
            System.out.println("User specific directory not existing, creating /" + uname);
            if (userSpecificDir.mkdirs()) {
                System.out.println("Created /" + uname + "/ successfully.");
            }
        }

        Optional<AuroraUser> currentUser = userRepo.findByUsername(uname);
        final var userEmpty = currentUser.isEmpty();

        if (userEmpty) {
            // Handle error
            return;
        }

        final var user = currentUser.get();

        final var filename = "pfp";
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
