package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.views.NavigationBar;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
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

        TextField username = new TextField("Username");
        PasswordField password = new PasswordField("Password");
        Button loginButton = new Button("Login");

        loginButton.addClickListener(e -> {
            String user = username.getValue();
            String pass = password.getValue();

            System.out.println("Username logging in: " + user + " with a password " + pass);
            final var userInDb = userRepo.findByUsername(user);
            boolean exists = userInDb.isPresent();

            if (exists) {
                System.out.println(userInDb.get().getEmail());
                System.out.println(userInDb.get().getPassword());
            }

            Notification.show("Attempting to login with username: " + user);
        });

        // Add a shortcut to the login button
        loginButton.addClickShortcut(Key.ENTER);

        // Create a FormLayout and set it to 1 column
        FormLayout formLayout = new FormLayout();
        formLayout.setResponsiveSteps(new FormLayout.ResponsiveStep("0", 1));
        formLayout.addFormItem(username, "Username");
        formLayout.addFormItem(password, "Password");

        // Shadow
        formLayout.getStyle()
                .set("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2)")
                .set("padding", "20px")
                .set("border-radius", "10px")
                .set("background-color", "#fff");

        // Create a container to center the form
        VerticalLayout formContainer = new VerticalLayout();
        formContainer.setWidth("400px"); // Set a fixed width for the form container
        formContainer.setAlignItems(Alignment.CENTER);
        formContainer.getStyle().set("margin", "auto");

        // Add welcome text to the form container
        Text welcomeText = new Text("Welcome!");
        formContainer.add(welcomeText, formLayout, loginButton);

        // Center the form container on the page
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        // Add the form container to the main layout
        add(formContainer);
    }
}
