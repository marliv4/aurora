package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import org.hibernate.sql.ast.tree.insert.Values;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@PageTitle("Register")
@Route(value = "/register")
@AnonymousAllowed
public class RegisterView extends VerticalLayout {
    private final UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final ValuesService valuesService;

    final String patternStr = "^[a-zA-Z0-9_.-]*$";
    final Pattern pattern = Pattern.compile(patternStr);

    private final UserService userService;
    public RegisterView(UserRepo userRepo,
                        ValuesService valuesService,
                        UserService userService) {
        this.userRepo = userRepo;
        this.valuesService = valuesService;
        this.userService = userService;

        NavigationBar navbar = new NavigationBar(valuesService, userService);
        add(navbar);

        TextField username = new TextField("Username");
        EmailField email = new EmailField("Email");
        PasswordField password = new PasswordField("Password");
        PasswordField repeatPassword = new PasswordField("Repeat password");
        Button resgisterButton = new Button("Register");

        resgisterButton.addClickListener(e -> {
            String user = username.getValue();
            Matcher matcher = pattern.matcher(user);

            if (!matcher.matches()) {
                Notification.show("Usernames can only contain letters and numbers!", 3000, Notification.Position.BOTTOM_CENTER);
                return;
            }

            String mail = email.getValue();
            String pass = password.getValue();
            String passRepeat = repeatPassword.getValue();

            registerUser(user, mail, pass, passRepeat);
        });

        // Add a shortcut to the login button for convenience
        resgisterButton.addClickShortcut(Key.ENTER);

        // Create a FormLayout and set it to 1 column
        FormLayout formLayout = new FormLayout();
        formLayout.setResponsiveSteps(new FormLayout.ResponsiveStep("0", 1));
        formLayout.addFormItem(username, "Username");
        formLayout.addFormItem(email, "Email");
        formLayout.addFormItem(password, "Password");
        formLayout.addFormItem(repeatPassword, "Repeat password");

        // Apply shadow styling
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
        formContainer.add(welcomeText, formLayout, resgisterButton);

        // Center the form container on the page
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        // Add the form container to the main layout
        add(formContainer);
    }

    public void registerUser(
            String user,
            String mail,
            String pass,
            String passRepeat
    ) {
        if (user.isEmpty() || mail.isEmpty() || pass.isEmpty() || passRepeat.isEmpty()) {
            Notification.show("Error: not all fields are filled out!");
            return;
        }

        if (!pass.equals(passRepeat)) {
            Notification.show("Error: passwords do not match!");
            return;
        }

        final boolean usernameAlreadyExists = userRepo.findByUsername(user).isPresent();
        if (usernameAlreadyExists) {
            Notification.show("Error: username already given!");
            return;
        }

        final boolean emailAlreadyExists = userRepo.findByEmail(mail).isPresent();
        if (emailAlreadyExists) {
            Notification.show("Error: email already given!");
            return;
        }


        AuroraUser newUser = new AuroraUser(
                user,
                mail,
                passwordEncoder.encode(pass),
                "user"
        );
        userRepo.save(newUser);
        Notification.show("Sucessfully registered!", 3000, Notification.Position.BOTTOM_END);
    }
}
