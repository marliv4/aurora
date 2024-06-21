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
package com.livajusic.marko.aurora.views.dialogs;


import com.livajusic.marko.aurora.services.FollowService;
import com.livajusic.marko.aurora.services.ProfilePictureService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.ProfilePicture;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.server.StreamResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class FollowersDialog extends BaseDialog {

    private final FollowService followService;
    private final UserService userService;

    @Autowired
    public FollowersDialog(FollowService followService,
                           UserService userService) {
        super();
        this.followService = followService;
        this.userService = userService;
    }

    public enum DialogType {
        DIALOG_SHOW_USERS_FOLLOWERS,
        DIALOG_SHOW_FOLLOWING_USERS
    }

    public void openDialog(Long userId,
                           DialogType dt) {
        VerticalLayout dialogLayout = new VerticalLayout();
        List<Object[]> entries = new ArrayList<>();
        if (dt == DialogType.DIALOG_SHOW_USERS_FOLLOWERS) {
            entries.addAll(followService.getUsersFollowers(userId));
            title.setText(String.format("%s followers", userService.getUsernameById(userId)));
        } else if (dt == DialogType.DIALOG_SHOW_FOLLOWING_USERS) {
            entries.addAll(followService.getFollowingUsers(userId));
            title.setText(String.format("Who %s is following", userService.getUsernameById(userId)));
        }

        for (Object[] e : entries) {
            String name = (String)e[0];
            HorizontalLayout userCard = createUserCard(name, (byte[])e[1]);
            dialogLayout.add(userCard);
        }
        Button closeButton = new Button("Close");
        closeButton.addClickListener(closeEvent -> dialog.close());
        dialogLayout.add(closeButton);

        dialog.add(dialogLayout);
        dialog.open();
    }

    private HorizontalLayout createUserCard(String username, byte[] imageData) {
        HorizontalLayout userCard = new HorizontalLayout();
        userCard.setWidth("100%");
        userCard.getStyle().set("border", "1px solid #ccc")
                .set("border-radius", "10px")
                .set("padding", "10px")
                .set("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.1)")
                .set("margin", "10px 0");

        StreamResource resource = new StreamResource("profile-picture", () -> new ByteArrayInputStream(imageData));
        Image profilePicture = new Image(resource, "Profile Picture");
        profilePicture.setWidth("50px");
        profilePicture.setHeight("50px");
        profilePicture.getStyle().set("border-radius", "50%");

        Span usernameSpan = new Span(username);
        usernameSpan.getStyle().set("font-weight", "bold")
                .set("margin-left", "10px")
                .set("align-self", "center");

        userCard.add(profilePicture, usernameSpan);

        return userCard;
    }
}
