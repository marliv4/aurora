package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.views.dialogs.CRUDDialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;

@PageTitle("Admin Dashboard")
@Route(value = "/admin")
@RolesAllowed("admin")
public class AdminDashboardView extends VerticalLayout {
    private final UserRepo userRepo;

    private final GifRepo gifRepo;

    private final UserService userService;

    public AdminDashboardView(UserRepo userRepo,
                              GifRepo gifRepo,
                              UserService userService) {
        this.userRepo = userRepo;
        this.gifRepo = gifRepo;
        this.userService = userService;

        add(new H1("Admin Dashboard"));

        addUsersTable();
        addGifsTable();
    }

    private void addUsersTable() {
        add(new H2("Users Table"));
        Grid<AuroraUser> grid = new Grid<>(AuroraUser.class, false);
        final var users = userRepo.findAll();

        grid.addColumn(AuroraUser::getId).setHeader("ID");
        grid.addColumn(AuroraUser::getUsername).setHeader("Username");
        grid.addColumn(AuroraUser::getPassword).setHeader("Password");
        // grid.addColumn(AuroraUser::getRole).setHeader("Role");
        grid.addColumn(AuroraUser::getEmail).setHeader("Email");

        grid.setItems(users);
        grid.setAllRowsVisible(true);
        grid.addSelectionListener(selection -> {
            final var selectedUser = selection.getFirstSelectedItem();
            if (selectedUser.isPresent()) {
                final var selectedUsername = selectedUser.get().getUsername();
                System.out.println(selectedUsername);
                CRUDDialog cd = new CRUDDialog(selectedUsername, userService);
                cd.open();
            }
        });

        add(grid);
    }

    private void addGifsTable() {
        add(new H2("GIFs Table"));
        Grid<AuroraGIF> grid = new Grid<>(AuroraGIF.class, false);
        final var gifs = gifRepo.findAll();

        grid.addColumn(AuroraGIF::getId).setHeader("GIF_ID");
        grid.addColumn(AuroraGIF::getLicense).setHeader("License");
        // grid.addColumn(AuroraGIF::getPath).setHeader("Path");
        grid.addColumn(AuroraGIF::getPublishDate).setHeader("Publish date");
        grid.addColumn(gif -> gif.getUser().getId()).setHeader("User_ID");

        grid.setItems(gifs);
        grid.setAllRowsVisible(true);
        grid.addSelectionListener(selection -> {
            final var selectedGIF = selection.getFirstSelectedItem();
            if (selectedGIF.isPresent()) {
            }
        });

        add(grid);
    }
}
