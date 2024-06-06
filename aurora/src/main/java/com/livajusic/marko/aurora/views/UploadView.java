package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.BelongsToRepo;
import com.livajusic.marko.aurora.db_repos.GifCategoryRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.BelongsTo;
import com.livajusic.marko.aurora.tables.GifCategory;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Nav;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.FileBuffer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import jakarta.annotation.security.RolesAllowed;
import org.hibernate.sql.ast.tree.insert.Values;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Optional;

@PageTitle("Upload")
@Route(value = "/upload")
@RolesAllowed("user")
public class UploadView extends VerticalLayout {
    private final GifRepo gifRepo;

    private final UserRepo userRepo;
    private final GifCategoryRepo gifCategoryRepo;

    private final BelongsToRepo belongsToRepo;

    @Autowired
    UserService userService;

    @Value("${upload.directory}")
    private String basePath;

    private final ValuesService valuesService;

    public UploadView(GifRepo gifRepo,
                      UserRepo userRepo,
                      GifCategoryRepo gifCategoryRepo,
                      BelongsToRepo belongsToRepo,
                      ValuesService valuesService) {
        this.gifRepo = gifRepo;
        this.userRepo = userRepo;
        this.gifCategoryRepo = gifCategoryRepo;
        this.belongsToRepo = belongsToRepo;
        this.valuesService = valuesService;

        NavigationBar navbar = new NavigationBar(valuesService, userService);
        add(navbar);

        Span fileLabel = new Span("Choose a file:");
        FileBuffer buffer = new FileBuffer();
        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes("image/gif");

        ComboBox<String> licenseSelect = new ComboBox<>();
        TextField categoryInput = new TextField();

        add(fileLabel, upload);

        Span licenseLabel = new Span("Choose a license:");
        licenseSelect.setItems("CC BY (Attribution)", "CC BY-SA (Attribution-ShareAlike)", "CC BY-ND (Attribution-NoDerivatives)",
                "CC BY-NC (Attribution-NonCommercial)", "CC BY-NC-SA (Attribution-NonCommercial-ShareAlike)",
                "CC BY-NC-ND (Attribution-NonCommercial-NoDerivatives)", "Public Domain", "All Rights Reserved");
        licenseSelect.setReadOnly(false);

        Span categoryLabel = new Span("Enter a category:");
        categoryInput.setRequired(true);

        Button submitButton = new Button("Submit");
        submitButton.addClickListener(e -> {
            InputStream inputStream = buffer.getInputStream();
            saveFile(inputStream, licenseSelect.getValue(), categoryInput.getValue());
        });

        FormLayout formLayout = createFormLayout(licenseSelect, categoryInput);

        VerticalLayout formContainer = new VerticalLayout();
        formContainer.setWidth("400px"); // Set a fixed width for the form container
        formContainer.getStyle().set("margin", "auto");
        formContainer.add(formLayout, submitButton);

        add(formContainer);

        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
    }

    private FormLayout createFormLayout(ComboBox<String> licenseSelect, TextField categoryInput) {
        FormLayout formLayout = new FormLayout();
        // formLayout.addFormItem(upload, "File");
        formLayout.addFormItem(licenseSelect, "License");
        formLayout.addFormItem(categoryInput, "Categories (CSV)");

        formLayout.getStyle()
                .set("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2)")
                .set("padding", "20px")
                .set("border-radius", "10px")
                .set("background-color", "#fff");

        return formLayout;
    }

    public void saveFile(InputStream is, String license, String category) {
        // Check if directory with user's username exists
        File imagesDir = new File(basePath);
        if (!imagesDir.exists()) {
            System.out.println("/images folder not existing, creating it...");
            if (imagesDir.mkdirs()) {
                System.out.println("Created /images/ successfully.");
            }
        }

        String uname = userService.getCurrentUsername();
        File userSpecificDir = new File(imagesDir  + "/" + uname + "/");

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


        final var utilDate = AuroraDateManager.getUtilDate();
        LocalDateTime dateTime = LocalDateTime.parse(utilDate.toString(), DateTimeFormatter.ofPattern("EEE MMM dd HH:mm:ss zzz yyyy"));
        String time = dateTime.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        System.out.println(time);

        final var date = AuroraDateManager.getSqlDate(utilDate);
        System.out.println(date);

        var f = date + "_" + time + "_" + user.getId() + ".gif";
        final var filename = f.replace(":", "_");
        System.out.println("FILENAME: " + filename);
        // AuroraGIF(String path, AuroraUser user, Date publishDate, String license)
        AuroraGIF gif = new AuroraGIF(
                filename,
                user,
                date,
                license
        );
        gifRepo.save(gif);

        try {
            final var endPath = userSpecificDir + "/" + filename;
            System.out.println("endPATH: " + endPath);

            Files.copy(is, Paths.get(endPath));
        } catch (java.io.IOException e) {
            return;
        }

        final var categories = Arrays.asList(category.split(","));
        if (categories.size() > 10) {
            return;
        }

        for (String c : categories) {
            System.out.println(c);
            final var t = gifCategoryRepo.findByCategory(c.trim().toLowerCase());
            GifCategory gifCategory;
            if (t.isEmpty()) {
                gifCategory = new GifCategory(c);
                gifCategoryRepo.save(gifCategory);
            } else {
                gifCategory = t.get();
            }

            boolean exists = belongsToRepo.existsByGifAndCategory(gif, gifCategory);
            if (!exists) {
                BelongsTo belongsToEntry = new BelongsTo(gif, gifCategory);
                belongsToRepo.save(belongsToEntry);
            }
        }

    }

    private static class AuroraDateManager {
        public static java.util.Date getUtilDate() {
            return new java.util.Date();
        }

        public static java.sql.Date getSqlDate(java.util.Date utilDate) {
            return new java.sql.Date(utilDate.getTime());
        }
    };
}