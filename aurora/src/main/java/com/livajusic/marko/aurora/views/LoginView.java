package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@PageTitle("Login")
@Route(value = "/login")
@AnonymousAllowed
public class LoginView extends VerticalLayout {

    private final UserRepo userRepo;

    public LoginView(UserRepo userRepo) {
        this.userRepo = userRepo;

        NavigationBar navbar = new NavigationBar();
        add(navbar);

        var login = new LoginForm();
        login.setAction("login");

        add(login);
    }
}
