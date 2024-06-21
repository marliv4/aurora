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
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.RoleRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.NotificationService;
import com.livajusic.marko.aurora.services.ProfilePictureService;
import com.livajusic.marko.aurora.services.SettingsService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.Role;
import com.livajusic.marko.aurora.views.dialogs.CRUDDialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.security.access.prepost.PreAuthorize;

@PageTitle("Admin Dashboard")
@Route(value = "/admin")
@RolesAllowed("admin")
public class AdminDashboardView extends VerticalLayout {
    private final UserRepo userRepo;

    private final GifRepo gifRepo;
    private final RoleRepo roleRepo;

    private final UserService userService;

    public AdminDashboardView(UserRepo userRepo,
                              GifRepo gifRepo,
                              RoleRepo roleRepo,
                              UserService userService,
                              ProfilePictureService profilePictureService,
                              LanguagesController languagesController,
                              SettingsService settingsService,
                              NotificationService notificationService) {
        this.userRepo = userRepo;
        this.gifRepo = gifRepo;
        this.roleRepo = roleRepo;
        this.userService = userService;

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
        add(navbar);
        add(new H1("Admin Dashboard"));

        addUsersTable();
        addGifsTable();
        addRolesTable();
    }

    private void addUsersTable() {
        add(new H2("Users Table"));
        Grid<AuroraUser> grid = new Grid<>(AuroraUser.class, false);
        final var users = userRepo.findAll();

        grid.addColumn(AuroraUser::getId).setHeader("ID");
        grid.addColumn(AuroraUser::getUsername).setHeader("Username");
        grid.addColumn(AuroraUser::getPassword).setHeader("Password");
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

    private void addRolesTable() {
        add(new H2("Roles Table"));
        Grid<Role> grid = new Grid<>(Role.class, false);
        final var gifs = roleRepo.findAll();

        grid.addColumn(Role::getUserId).setHeader("User_ID");
        grid.addColumn(Role::getRole).setHeader("Role");

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
