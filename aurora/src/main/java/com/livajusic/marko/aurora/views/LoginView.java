package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
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
@Route("login")
@AnonymousAllowed
public class LoginView extends VerticalLayout implements BeforeEnterObserver {

    private final UserRepo userRepo;
    private final LoginForm login = new LoginForm();

    private final ValuesService valuesService;

    private final UserService userService;
    public LoginView(UserRepo userRepo,
                     ValuesService valuesService,
                     UserService userService,
                     LanguagesController languagesController) {
        this.userRepo = userRepo;
        this.valuesService = valuesService;
        this.userService = userService;

        NavigationBar navbar = new NavigationBar(valuesService, userService, languagesController);
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
