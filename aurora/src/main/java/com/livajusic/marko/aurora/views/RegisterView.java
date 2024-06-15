package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.db_repos.PrivacySettingsRepo;
import com.livajusic.marko.aurora.db_repos.ProfilePictureRepo;
import com.livajusic.marko.aurora.db_repos.RoleRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.ProfilePictureService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.PrivacySettings;
import com.livajusic.marko.aurora.tables.ProfilePicture;
import com.livajusic.marko.aurora.tables.Role;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.UI;
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

import com.vaadin.flow.router.RouteConfiguration;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import org.hibernate.sql.ast.tree.insert.Values;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@PageTitle("Register")
@Route(value = "/register")
@AnonymousAllowed
public class RegisterView extends VerticalLayout {
    private final UserRepo userRepo;

    private final PrivacySettingsRepo privacySettingsRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final ValuesService valuesService;

    private final RoleRepo roleRepo;

    final String patternStr = "^[a-zA-Z0-9_.-]*$";
    final Pattern pattern = Pattern.compile(patternStr);

    private final UserService userService;
    private final ProfilePictureService profilePictureService;
    public RegisterView(UserRepo userRepo,
                        PrivacySettingsRepo privacySettingsRepo,
                        ValuesService valuesService,
                        RoleRepo roleRepo,
                        UserService userService,
                        LanguagesController languagesController,
                        ProfilePictureService profilePictureService) {
        this.userRepo = userRepo;
        this.privacySettingsRepo = privacySettingsRepo;
        this.valuesService = valuesService;
        this.roleRepo = roleRepo;
        this.userService = userService;
        this.profilePictureService = profilePictureService;

        NavigationBar navbar = new NavigationBar(valuesService, userService, profilePictureService, languagesController);
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

        resgisterButton.addClickShortcut(Key.ENTER);

        FormLayout formLayout = new FormLayout();
        formLayout.setResponsiveSteps(new FormLayout.ResponsiveStep("0", 1));
        formLayout.addFormItem(username, "Username");
        formLayout.addFormItem(email, "Email");
        formLayout.addFormItem(password, "Password");
        formLayout.addFormItem(repeatPassword, "Repeat password");

        formLayout.getStyle()
                .set("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2)")
                .set("padding", "20px")
                .set("border-radius", "10px")
                .set("background-color", "#fff");

        VerticalLayout formContainer = new VerticalLayout();
        formContainer.setWidth("400px"); // Set a fixed width for the form container
        formContainer.setAlignItems(Alignment.CENTER);
        formContainer.getStyle().set("margin", "auto");

        Text welcomeText = new Text("Welcome!");
        formContainer.add(welcomeText, formLayout, resgisterButton);

        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

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
                passwordEncoder.encode(pass)
        );
        userRepo.save(newUser);

        PrivacySettings ps = new PrivacySettings(newUser, 1);
        privacySettingsRepo.save(ps);

        Role standardRole = new Role(newUser.getId(), "user");
        roleRepo.save(standardRole);

        /*
        final var pfpBytes = profilePictureService.getDefaultPfpBytes();
        final var pfpInputStream = profilePictureService.getDefaultPfpAsInputStream();
        ProfilePicture pfp = new ProfilePicture(pfpBytes, newUser);
        profilePictureService.basicSave(pfp);
        */
        Notification.show("Sucessfully registered!", 3000, Notification.Position.BOTTOM_END);
        RouteConfiguration.forSessionScope().setRoute("login", LoginView.class);
        UI.getCurrent().navigate("login");
    }
}
