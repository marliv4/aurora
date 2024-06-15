package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.services.ProfilePictureService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.views.LoginView;
import com.livajusic.marko.aurora.views.RegisterView;
import com.livajusic.marko.aurora.views.UploadView;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.livajusic.marko.aurora.views.HomeView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.router.RouteConfiguration;
import org.aspectj.apache.bcel.generic.SwitchBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.context.MessageSource;
import org.springframework.web.servlet.LocaleResolver;

import java.io.ByteArrayInputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

@StyleSheet("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap")
// @CssImport("styles.css")
public class NavigationBar extends HorizontalLayout {
    private final ValuesService valuesService;

    private final UserService userService;
    private final ProfilePictureService profilePictureService;
    private LanguagesController languagesController;

    private static final List<String> LANGUAGES = Arrays.asList("English", "Deutsch");
    private static final List<VaadinIcon> ICONS = Arrays.asList(VaadinIcon.GLOBE, VaadinIcon.FLAG);

    public NavigationBar(ValuesService valuesService,
                         UserService userService,
                         ProfilePictureService profilePictureService,
                         LanguagesController languagesController) {
        this.valuesService = valuesService;
        this.userService = userService;
        this.profilePictureService = profilePictureService;
        this.languagesController = languagesController;

        setAlignItems(HorizontalLayout.Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        getElement().getStyle()
                .set("background-color", "#0D1219")
                .set("box-shadow", "0px 2px 4px rgba(0, 0, 0, 0.1)")
                .set("margin-top", "0")
                .set("display", "flex")
                .set("align-items", "center")
                .set("padding", "0")
                .set("border-bottom", "1px solid #3F4D62");

        // getElement().getStyle().set("padding", "10px 20px");
        // getElement().getStyle().set("border-radius", "30px");
        getElement().getStyle().set("gap", "20px");
        getElement().getStyle().set("box-shadow", "0px 2px 4px rgba(0, 0, 0, 0.1)");
        getElement().getStyle().set("margin-top", "0");

        setWidthFull();

        RouterLink homeLink = new RouterLink(languagesController.get("home"), HomeView.class);
        homeLink.getStyle()
                .set("color", "white")
                .set("font-weight", "bold")
                .set("text-decoration", "none")
                .set("transition", "color 0.3s")
                .set("font-size", "15px");

        RouterLink registerLink = new RouterLink(languagesController.get("register"), RegisterView.class);
        registerLink.getStyle()
                .set("color", "white")
                .set("font-weight", "bold")
                .set("text-decoration", "none");

        RouterLink loginLink = new RouterLink(languagesController.get("login"), LoginView.class);
        loginLink.getStyle()
                .set("color", "white")
                .set("font-weight", "bold")
                .set("text-decoration", "none")
                .set("font-size", "15px");

        RouterLink publishLink = new RouterLink(languagesController.get("upload"), UploadView.class);
        publishLink.getStyle()
                .set("color", "white")
                .set("font-weight", "bold")
                .set("text-decoration", "none")
                .set("font-size", "15px");

        boolean addRegisterAndLoginLink = true;
        MenuBar profileMenu = new MenuBar();
        if (userService.isLoggedIn()) {
            final var userId = userService.getCurrentUserId();
            final var pfpOptional = profilePictureService.getPfpByUserId(userId);

            if (pfpOptional.isPresent()) {
                final var pfp = pfpOptional.get();
                StreamResource resource = new StreamResource("ThisNameIsIrrelevant.",
                        () -> new ByteArrayInputStream(pfp.getImageData()));

                if (profilePictureService.userHasPfp(userId)) {
                    Image profileImage = new Image(resource, "Profile Picture");

                    profileImage.setWidth("30px");
                    profileImage.setHeight("30px");
                    profileImage.getStyle().set("border-radius", "50%");

                    MenuItem profileMenuItem = profileMenu.addItem(profileImage);
                    profileMenuItem.getSubMenu().addItem(languagesController.get("myprofile"), e -> navigateToProfile());
                    profileMenuItem.getSubMenu().addItem(languagesController.get("settings"), e -> navigateToSettings());
                    profileMenuItem.getSubMenu().addItem(languagesController.get("create"), e -> navigateToCreate());
                    profileMenuItem.getSubMenu().addItem(languagesController.get("logout"), e -> {
                        userService.logout();
                        getUI().get().getPage().reload();
                    });
                    addRegisterAndLoginLink = false;
                }
            }
        }

        ComboBox<String> languageSwitcher = new ComboBox<>();
        languageSwitcher.setItems("English", "Deutsch");
        // languageSwitcher.setValue("English");
        languageSwitcher.addValueChangeListener(event -> {
            String selectedLanguage = event.getValue();
            switchLanguage(selectedLanguage);
        });
        add(languageSwitcher);

        Button themeToggleButton = new Button(new Icon(VaadinIcon.MOON));
        themeToggleButton.getElement().getStyle().set("background-color", "#1c1f2b");
        themeToggleButton.getElement().getStyle().set("border", "none");
        themeToggleButton.getElement().getStyle().set("border-radius", "50%");
        themeToggleButton.getElement().getStyle().set("width", "40px");
        themeToggleButton.getElement().getStyle().set("height", "40px");
        themeToggleButton.getElement().getStyle().set("display", "flex");
        themeToggleButton.getElement().getStyle().set("align-items", "center");
        themeToggleButton.getElement().getStyle().set("justify-content", "center");
        themeToggleButton.getElement().getStyle().set("color", "white");
        themeToggleButton.getElement().getStyle().set("cursor", "pointer");

        themeToggleButton.addClickListener(event -> {
            Icon currentIcon = (Icon) themeToggleButton.getIcon();
            if (currentIcon.getElement().getAttribute("icon").equals(VaadinIcon.MOON.create().getElement().getAttribute("icon"))) {
                themeToggleButton.setIcon(new Icon(VaadinIcon.SUN_DOWN));
            } else {
                themeToggleButton.setIcon(new Icon(VaadinIcon.MOON));
            }
        });

        add(themeToggleButton);

        TextField userSearch = createUserSearchField();

        if (addRegisterAndLoginLink) {
            add(/* logo, */ homeLink, registerLink, loginLink, publishLink, /* searchField, */ profileMenu, userSearch);
        } else {
            add(/* logo, */ homeLink, publishLink, /* searchField, */ profileMenu, userSearch);
        }
        setSpacing(true);
    }

    private void switchLanguage(String language) {
        Locale locale;
        switch (language) {
            case "Deutsch":
                languagesController.setLocale(Locale.GERMAN);
                break;
            default:
                languagesController.setLocale(Locale.ENGLISH);
                break;
        }
        UI.getCurrent().getPage().reload();
    }

    private TextField createUserSearchField() {
        TextField searchField = new TextField();
        searchField.setPlaceholder("Search users");
        searchField.addKeyPressListener(Key.ENTER, e -> userService.searchForUser(searchField.getValue()));

        return searchField;
    }

    private void navigateToProfile() {
        UI.getCurrent().navigate(MyProfileView.class);
    }

    private void navigateToSettings() {
        RouteConfiguration.forSessionScope().setRoute("settings", SettingsView.class);
        UI.getCurrent().navigate("settings");
    }

    private void navigateToCreate() {
        RouteConfiguration.forSessionScope().setRoute("create", SettingsView.class);
        UI.getCurrent().navigate("create");
    }
}