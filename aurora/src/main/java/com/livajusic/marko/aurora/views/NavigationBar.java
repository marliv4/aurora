package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.views.LoginView;
import com.livajusic.marko.aurora.views.RegisterView;
import com.livajusic.marko.aurora.views.HomeView;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.RouterLink;

public class NavigationBar extends HorizontalLayout {

    public NavigationBar() {
        // Logo
        Anchor logo = new Anchor("/", "Logo");
        logo.getStyle().set("font-weight", "bold");

        // Navigation links
        RouterLink homeLink = new RouterLink("Home", HomeView.class);
        RouterLink registerLink = new RouterLink("Register", RegisterView.class);
        RouterLink loginLink = new RouterLink("Login", LoginView.class);
        RouterLink publishLink = new RouterLink("Upload", UploadView.class);

        // Search field
        TextField searchField = new TextField();
        searchField.setPlaceholder("Search");

        // Add components to the navbar
        add(logo, homeLink, registerLink, loginLink, publishLink, searchField);

        // Style adjustments
        setSpacing(true); // Add space between components
        setAlignItems(Alignment.CENTER); // Align items vertically in the center
    }
}
