package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.ProfilePictureService;
import com.livajusic.marko.aurora.services.SettingsService;
import com.livajusic.marko.aurora.services.UserService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.component.orderedlayout.FlexComponent;

@PageTitle("Login")
@Route("login")
@AnonymousAllowed
public class LoginView extends VerticalLayout implements BeforeEnterObserver {

    private final UserRepo userRepo;
    private final SettingsService settingsService;
    private final LoginForm login = new LoginForm();

    public LoginView(UserRepo userRepo,
                     UserService userService,
                     ProfilePictureService profilePictureService,
                     LanguagesController languagesController,
                     SettingsService settingsService) {
        this.userRepo = userRepo;
        this.settingsService = settingsService;

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService);
        add(navbar);
        setSizeFull();
        setAlignItems(Alignment.CENTER);

        login.setAction("login");
        add(login);
        login.addLoginListener(l -> {
                    UI.getCurrent().navigate("/");
                    /*
                    final var userId = userService.getCurrentUserId();
                    System.out.println("tester" + userId);
                    String lang = settingsService.getUsersLanguage(userId);
                    System.out.println(lang);
                    languagesController.switchLanguage(lang);
                    */
                }
        );

    }

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        if (beforeEnterEvent.getLocation()
                .getQueryParameters()
                .getParameters()
                .containsKey("error")) {
            login.setError(true);
        }
    }
}
