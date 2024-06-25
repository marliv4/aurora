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
import com.livajusic.marko.aurora.db_repos.*;
import com.livajusic.marko.aurora.services.NotificationService;
import com.livajusic.marko.aurora.services.ProfilePictureService;
import com.livajusic.marko.aurora.services.SettingsService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.tables.*;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.Unit;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.vaadin.flow.component.textfield.TextField;

import java.util.List;

@PageTitle("Admin Dashboard")
@Route(value = "/admin")
@RolesAllowed("admin")
@Transactional
public class AdminDashboardView extends VerticalLayout {
    private final UserRepo userRepo;
    private final GifRepo gifRepo;
    private final RoleRepo roleRepo;
    private final CommentRepo commentRepo;
    private final FollowRepo followsRepo;

    private final UserService userService;
    private final EntityManager entityManager;

    public AdminDashboardView(UserRepo userRepo,
                              GifRepo gifRepo,
                              RoleRepo roleRepo,
                              CommentRepo commentRepo,
                              UserService userService,
                              ProfilePictureService profilePictureService,
                              LanguagesController languagesController,
                              SettingsService settingsService,
                              NotificationService notificationService,
                              FollowRepo followsRepo,
                              EntityManager entityManager) {
        this.userRepo = userRepo;
        this.gifRepo = gifRepo;
        this.roleRepo = roleRepo;
        this.commentRepo = commentRepo;
        this.userService = userService;
        this.followsRepo = followsRepo;
        this.entityManager = entityManager;

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
        add(navbar);
        add(new H1("Admin Dashboard"));

        TextField sqlQuery = new TextField();
        sqlQuery.setPlaceholder("Enter SQL statement (preferably update or delete; tables will update after page refresh)");
        int placeholderLength = sqlQuery.getPlaceholder().length();
        int estimatedWidth = placeholderLength * 8;
        sqlQuery.setWidth(estimatedWidth, Unit.PIXELS);
        add(sqlQuery);

        sqlQuery.addKeyPressListener(Key.ENTER, event -> {
            String query = sqlQuery.getValue();
            executeSqlQuery(query);
        });

        addTable("aurora_users", AuroraUser.class, userRepo);
        addTable("aurora_gifs", AuroraGIF.class, gifRepo);
        addTable("roles", Role.class, roleRepo);
        addTable("comments", Comment.class, commentRepo);
        addTable("follows", Follows.class, followsRepo);
    }

    private <T, ID> void addTable(String tableName, Class<T> className, JpaRepository<T, ID> repository) {
        add(new H2(tableName));
        Grid<T> grid = new Grid<>(className, false);

        List<T> items = repository.findAll();

        if (className == AuroraUser.class) {
            grid.addColumn(item -> ((AuroraUser) item).getId()).setHeader("user_id");
            grid.addColumn(item -> ((AuroraUser) item).getUsername()).setHeader("username");
            grid.addColumn(item -> ((AuroraUser) item).getEmail()).setHeader("email");
            grid.addColumn(item -> ((AuroraUser) item).getPassword()).setHeader("password");
        } else if (className == AuroraGIF.class) {
            grid.addColumn(item -> ((AuroraGIF) item).getId()).setHeader("gif_id");
            grid.addColumn(item -> ((AuroraGIF) item).getDescription()).setHeader("description");
            grid.addColumn(item -> ((AuroraGIF) item).getPublishDate()).setHeader("publish_date");
            grid.addColumn(item -> ((AuroraGIF) item).getUser().getId()).setHeader("user_id");
        }  else if (className == Role.class) {
            grid.addColumn(item -> ((Role) item).getRole()).setHeader("role");
            grid.addColumn(item -> ((Role) item).getUserId()).setHeader("user_id");
        }  else if (className == Comment.class) {
            grid.addColumn(item -> ((Comment) item).getCommentId()).setHeader("comment_id");
            grid.addColumn(item -> ((Comment) item).getCommentText()).setHeader("comment_text");
            grid.addColumn(item -> ((Comment) item).getCreatedAt()).setHeader("created_at");
            grid.addColumn(item -> ((Comment) item).getGif().getId()).setHeader("gif_id");
            grid.addColumn(item -> ((Comment) item).getUser().getId()).setHeader("user_id");
        } else if (className == Follows.class) {
            grid.addColumn(item -> ((Follows) item).getUser().getId()).setHeader("user_id");
            grid.addColumn(item -> ((Follows) item).getFollowsUser().getId()).setHeader("follows_user_id");
            grid.addColumn(item -> ((Follows) item).getFollowedAt()).setHeader("followed_at");
        }

        grid.setItems(items);
        grid.setAllRowsVisible(true);
        add(grid);
    }

    @Transactional
    public void executeSqlQuery(String queryStr) {
        System.out.println(queryStr);
        Query query = entityManager.createNativeQuery(queryStr);
        query.executeUpdate();
        entityManager.clear();
        entityManager.refresh(entityManager);
    }
}
