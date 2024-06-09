package com.livajusic.marko.aurora.views.dialogs;


import com.livajusic.marko.aurora.services.FollowService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

// @Route("subpage-example")
@Component
public class FollowersDialog extends BaseDialog {

    private final FollowService followService;

    @Autowired
    public FollowersDialog(FollowService followService) {
        super();
        this.followService = followService;
    }

    public enum DialogType {
        DIALOG_SHOW_USERS_FOLLOWERS,
        DIALOG_SHOW_FOLLOWING_USERS
    }

    public void openDialog(Long userId,
                           DialogType dt) {
        VerticalLayout dialogLayout = new VerticalLayout();

        List<String> entries = new ArrayList<>();
        if (dt == DialogType.DIALOG_SHOW_USERS_FOLLOWERS) {
            entries.addAll(followService.getUsersFollowers(userId));
        } else if (dt == DialogType.DIALOG_SHOW_FOLLOWING_USERS) {
            entries.addAll(followService.getFollowingUsers(userId));
        }

        for (String e : entries) {
            HorizontalLayout userCard = createUserCard("/images/profilepictures/TODO", e);
            dialogLayout.add(userCard);
        }
        Button closeButton = new Button("Close");
        closeButton.addClickListener(closeEvent -> dialog.close());
        dialogLayout.add(closeButton);

        dialog.add(dialogLayout);
        dialog.open();
    }

    private HorizontalLayout createUserCard(String profilePicturePath, String username) {
        HorizontalLayout userCard = new HorizontalLayout();
        userCard.setWidth("100%");
        userCard.getStyle().set("border", "1px solid #ccc")
                .set("border-radius", "10px")
                .set("padding", "10px")
                .set("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.1)")
                .set("margin", "10px 0");

        Image profilePicture = new Image(profilePicturePath, "Profile Picture");
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