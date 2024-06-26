/*
 * This file is part of Aurora.
 *
 * Aurora is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Aurora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Aurora. If not, see <https://www.gnu.org/licenses/>.
 *
 * Author: Marko Livajusic
 * Email: marko.livajusic4 <at> gmail.com
 * Copyright: (C) 2024 Marko Livajusic
 */
package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.db_repos.SettingsRepo;
import com.livajusic.marko.aurora.db_repos.ProfilePictureRepo;
import com.livajusic.marko.aurora.db_repos.RoleRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.*;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.Settings;
import com.livajusic.marko.aurora.tables.Role;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import com.vaadin.flow.router.RouteConfiguration;
import com.vaadin.flow.server.auth.AnonymousAllowed;
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
    private final SettingsRepo settingsRepo;
    private final UserService userService;
    private final ProfilePictureService profilePictureService;
    private final RoleRepo roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    final String patternStr = "^[a-zA-Z0-9_.-]*$";
    final Pattern pattern = Pattern.compile(patternStr);

    public RegisterView(UserRepo userRepo,
                        SettingsRepo settingsRepo,
                        RoleRepo roleRepo,
                        UserService userService,
                        LanguagesController languagesController,
                        ProfilePictureService profilePictureService,
                        SettingsService settingsService,
                        NotificationService notificationService) {
        this.userRepo = userRepo;
        this.settingsRepo = settingsRepo;
        this.roleRepo = roleRepo;
        this.userService = userService;
        this.profilePictureService = profilePictureService;

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
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
        formLayout.addClassName("register_form");

        VerticalLayout formContainer = new VerticalLayout();
        formContainer.setWidth("400px");
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

        Settings settings = new Settings(newUser, true, true, true, "English", 'd');
        settingsRepo.save(settings);
        Role standardRole = new Role(newUser.getId(), "user");
        roleRepo.save(standardRole);

        try {
            profilePictureService.savePfp(profilePictureService.getDefaultPfpAsInputStream(), newUser);
        } catch (IOException e) {
            e.printStackTrace();
        }

        Notification.show("Sucessfully registered!", 3000, Notification.Position.BOTTOM_CENTER);
        RouteConfiguration.forSessionScope().setRoute("login", LoginView.class);
        UI.getCurrent().navigate("login");
    }
}
