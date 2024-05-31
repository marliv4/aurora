package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.UserRepo;
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
import org.springframework.beans.factory.annotation.Value;

@PageTitle("Login")
@Route(value = "/login")
@AnonymousAllowed
public class LoginView extends VerticalLayout implements BeforeEnterObserver {

    private final UserRepo userRepo;
    private final LoginForm login = new LoginForm();

    private final ValuesService valuesService;

    private final UserService userService;
    public LoginView(UserRepo userRepo,
                     ValuesService valuesService,
                     UserService userService) {
        this.userRepo = userRepo;
        this.valuesService = valuesService;
        this.userService = userService;

        NavigationBar navbar = new NavigationBar(valuesService, userService);
        add(navbar);
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        /*
        login.addLoginListener(event -> {
            UI.getCurrent().navigate("/");
        });
        */
        login.setAction("login");
        login.addLoginListener(l -> UI.getCurrent().navigate("/"));
        add(login);
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
