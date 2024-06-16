package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.ProfilePictureService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
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
    private final LoginForm login = new LoginForm();

    public LoginView(UserRepo userRepo,
                     ValuesService valuesService,
                     UserService userService,
                     ProfilePictureService profilePictureService,
                     LanguagesController languagesController) {
        this.userRepo = userRepo;

        NavigationBar navbar = new NavigationBar(valuesService, userService, profilePictureService, languagesController);
        add(navbar);
        setSizeFull();
        setAlignItems(Alignment.CENTER);

        login.setAction("login");
        add(login);
        login.addLoginListener(l -> {
                    System.out.println("USERNAME: " + login.getChildren().findFirst().get().toString());
                    UI.getCurrent().navigate("/");
                }
        );

    }

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        if(beforeEnterEvent.getLocation()
                .getQueryParameters()
                .getParameters()
                .containsKey("error")) {
            login.setError(true);
        }
    }
}
