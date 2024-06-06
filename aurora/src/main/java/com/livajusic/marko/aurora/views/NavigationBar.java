package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.views.LoginView;
import com.livajusic.marko.aurora.views.RegisterView;
import com.livajusic.marko.aurora.views.UploadView;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.livajusic.marko.aurora.views.HomeView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.RouteConfiguration;
import org.aspectj.apache.bcel.generic.SwitchBuilder;

public class NavigationBar extends HorizontalLayout {
    private final ValuesService valuesService;

    private final UserService userService;

    public NavigationBar(ValuesService valuesService,
                         UserService userService) {
        this.valuesService = valuesService;
        this.userService = userService;
        // Logo
        setAlignItems(Alignment.CENTER); // Align items vertically in the center
        setJustifyContentMode(JustifyContentMode.CENTER);

        getElement().getStyle().set("background-color", "#D4DCFF");
        getElement().getStyle().set("box-shadow", "0px 2px 4px rgba(0, 0, 0, 0.1)");
        getElement().getStyle().set("margin-top", "0");
        setWidthFull();

        // Anchor logo = new Anchor("/", "Logo");
        // logo.getStyle().set("font-weight", "bold");

        RouterLink homeLink = new RouterLink("Home", HomeView.class);
        RouterLink registerLink = new RouterLink("Register", RegisterView.class);
        RouterLink loginLink = new RouterLink("Login", LoginView.class);
        RouterLink publishLink = new RouterLink("Upload", UploadView.class);

        MenuBar profileMenu = new MenuBar();
        if (isUserLoggedIn()) {
            Image profileImage = new Image("lol", "Profile Picture");
            profileImage.setWidth("30px");
            profileImage.setHeight("30px");
            profileImage.getStyle().set("border-radius", "50%");

            MenuItem profileMenuItem = profileMenu.addItem(profileImage);
            profileMenuItem.getSubMenu().addItem("My Profile", e -> navigateToProfile());
            profileMenuItem.getSubMenu().addItem("Settings", e -> navigateToSettings());
            profileMenuItem.getSubMenu().addItem("Logout", e -> logout());
        }

        TextField userSearch = createUserSearchField();

        // Add components to the navbar
        add(/* logo, */ homeLink, registerLink, loginLink, publishLink, /* searchField, */ profileMenu, userSearch);
        setSpacing(true);
    }

    private TextField createUserSearchField() {
        TextField searchField = new TextField();
        searchField.setPlaceholder("Search users");
        searchField.addKeyPressListener(Key.ENTER, e -> userService.searchForUser(searchField.getValue()));

        return searchField;
    }

    private void navigateToProfile() {
        RouteConfiguration.forSessionScope().setRoute("my_profile", MyProfileView.class);
        UI.getCurrent().navigate("my_profile");
    }

    private void navigateToSettings() {
        RouteConfiguration.forSessionScope().setRoute("settings", SettingsView.class);
        UI.getCurrent().navigate("settings");
    }

    private void logout() {
        VaadinSession.getCurrent().getSession().invalidate();
        getUI().get().getPage().reload();
    }

    private boolean isUserLoggedIn() {

        return false;
    }
}