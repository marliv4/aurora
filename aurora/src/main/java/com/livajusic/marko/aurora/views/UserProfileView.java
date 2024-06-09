package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.UserInfoDisplayUtils;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.FollowService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.sun.jna.platform.win32.Netapi32Util;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import org.hibernate.sql.ast.tree.insert.Values;

import java.util.ArrayList;
import java.util.List;

@PageTitle("Main")
@Route(value = "/profile")
@AnonymousAllowed
public class UserProfileView extends Div implements HasUrlParameter<String> {
    private H3 usernameText;
    private String username;

    private final ValuesService valuesService;
    private final UserService userService;
    private final FollowService followService;

    private final UserRepo userRepo;

    private final GifRepo gifRepo;

    List<Component> componentsToDelete = new ArrayList<Component>();
    public UserProfileView(ValuesService valuesService,
                           UserService userService,
                           FollowService followService,
                           UserRepo userRepo,
                           GifRepo gifRepo) {
        clearUserProfile();
        this.valuesService = valuesService;
        this.userService = userService;
        this.gifRepo = gifRepo;

        NavigationBar navbar = new NavigationBar(valuesService, userService);
        add(navbar);
        this.followService = followService;
        this.userRepo = userRepo;

        usernameText = new H3();
        add(usernameText);

        System.out.println("PROFILE OF USER." + username);
        usernameText.setText("Profile of user: " + username);

        if (userService.isLoggedIn()) {
            Button button = new Button("Follow");
            button.addClickListener(e -> {
                followUser();
            });
            add(button);
        }

        componentsToDelete.add(usernameText);
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

        final var userId = userService.getUserIdByUsername(username);
        UserInfoDisplayUtils userInfoDisplayUtils = new UserInfoDisplayUtils(gifRepo, userId, userService, followService);
        add(userInfoDisplayUtils.getInfoLayout());

        componentsToDelete.add(userInfoDisplayUtils.getInfoLayout());
        componentsToDelete.add(userInfoDisplayUtils.getFollowersSpan());
    }

    private void clearUserProfile() {
        System.out.println("clearUserProfile");
        componentsToDelete.forEach(this::remove);
        componentsToDelete.clear();

        // UI.getCurrent().getPage().reload();
    }
}
