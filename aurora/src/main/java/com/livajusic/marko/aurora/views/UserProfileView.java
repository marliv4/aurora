package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.FollowService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@PageTitle("Main")
@Route(value = "/profile")
@AnonymousAllowed
public class UserProfileView extends Div implements HasUrlParameter<String> {
    private H3 usernameText;
    private String username;
    private final UserService userService;
    private final FollowService followService;
    private final UserRepo userRepo;
    public UserProfileView(ValuesService valuesService,
                           UserService userService,
                           FollowService followService,
                           UserRepo userRepo) {
        this.userService = userService;

        NavigationBar navbar = new NavigationBar(valuesService, userService);
        add(navbar);
        this.followService = followService;
        this.userRepo = userRepo;

        usernameText = new H3();
        add(usernameText);

        boolean userLoggedIn = true;
        if (userLoggedIn) {
            Button button = new Button("Follow");
            button.addClickListener(e -> {
                followUser();
                System.out.println("a");
            });
            add(button);
        }
    }

    private void followUser() {
        System.out.println("followUser");
        System.out.println("username: " + username);



        final var followedUserId = userService.getUserIdByUsername(username);
        long getCurrentSessionsUserId = userService.getUserIdByUsername(userService.getCurrentUsername());
        followService.followUser(getCurrentSessionsUserId, followedUserId);
    }

    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        loadUserProfile(parameter);
    }

    private void loadUserProfile(String username) {
        this.username = username;
        usernameText.setText("Profile of user: " + username);
    }
}
