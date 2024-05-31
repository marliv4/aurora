package com.livajusic.marko.aurora.views;

import com.vaadin.flow.component.Composite;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.formlayout.FormLayout;


import jakarta.annotation.security.RolesAllowed;


@PageTitle("Settings")
@Route(value = "/settings")
@RolesAllowed({"user", "admin"})
public class SettingsView extends Composite<VerticalLayout> {

    public SettingsView() {
        getContent().add(new H2("Settings"));

        FormLayout formLayout = new FormLayout();
        formLayout.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("25em", 2)
        );

        // Language selection
        ComboBox<String> languageSelect = new ComboBox<>("Language");
        languageSelect.setItems("English", "German");
        languageSelect.setValue("English"); // Set default value
        formLayout.addFormItem(languageSelect, "Select Language");

        // Theme selection
        ComboBox<String> themeSelect = new ComboBox<>("Theme");
        themeSelect.setItems("Light", "Dark");
        themeSelect.setValue("Light"); // Set default value
        formLayout.addFormItem(themeSelect, "Select Theme");

        getContent().add(formLayout);
        getContent().add(new Hr());

        Button saveButton = new Button("Save");
        saveButton.addClickListener(event -> saveSettings());
        getContent().add(saveButton);
    }

    private void saveSettings() {
        System.out.println("saving");
    }
}
