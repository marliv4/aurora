package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.BelongsToRepo;
import com.livajusic.marko.aurora.db_repos.GifCategoryRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
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

import java.io.InputStream;

@PageTitle("Upload")
@Route(value = "/upload")
public class UploadView extends VerticalLayout {
    private final GifRepo gifRepo;

    private final UserRepo userRepo;
    private final GifCategoryRepo gifCategoryRepo;

    private final BelongsToRepo belongsToRepo;

    public UploadView(GifRepo gifRepo,
                      UserRepo userRepo,
                      GifCategoryRepo gifCategoryRepo,
                      BelongsToRepo belongsToRepo) {
        this.gifRepo = gifRepo;
        this.userRepo = userRepo;
        this.gifCategoryRepo = gifCategoryRepo;
        this.belongsToRepo = belongsToRepo;

        NavigationBar navbar = new NavigationBar();
        add(navbar);

        Span fileLabel = new Span("Choose a file:");
        FileBuffer buffer = new FileBuffer();
        Upload upload = new Upload(buffer);
        upload.setAcceptedFileTypes("image/gif");

        upload.addSucceededListener(event -> {
            InputStream inputStream = buffer.getInputStream();
            // Do something with the uploaded file
        });
        add(fileLabel, upload);

        Span licenseLabel = new Span("Choose a license:");
        ComboBox<String> licenseSelect = new ComboBox<>();
        licenseSelect.setItems("CC BY (Attribution)", "CC BY-SA (Attribution-ShareAlike)", "CC BY-ND (Attribution-NoDerivatives)",
                "CC BY-NC (Attribution-NonCommercial)", "CC BY-NC-SA (Attribution-NonCommercial-ShareAlike)",
                "CC BY-NC-ND (Attribution-NonCommercial-NoDerivatives)", "Public Domain", "All Rights Reserved");
        licenseSelect.setReadOnly(false);

        Span categoryLabel = new Span("Enter a category:");
        TextField categoryInput = new TextField();
        categoryInput.setRequired(true);

        Button submitButton = new Button("Submit");
        submitButton.addClickListener(e -> {
        });

        FormLayout formLayout = new FormLayout();
        // formLayout.addFormItem(upload, "File");
        formLayout.addFormItem(licenseSelect, "License");
        formLayout.addFormItem(categoryInput, "Categories (CSV)");

        formLayout.getStyle()
                .set("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2)")
                .set("padding", "20px")
                .set("border-radius", "10px")
                .set("background-color", "#fff");

        VerticalLayout formContainer = new VerticalLayout();
        formContainer.setWidth("400px"); // Set a fixed width for the form container
        formContainer.getStyle().set("margin", "auto");
        formContainer.add(formLayout, submitButton);

        add(formContainer);

        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
    }
}
