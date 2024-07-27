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
package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.views.MyProfileView;
import com.livajusic.marko.aurora.views.dialogs.CommentsDialog;
import com.livajusic.marko.aurora.views.dialogs.FurtherInformationDialog;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.server.StreamResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class GIFDisplayService {
    private final LikeService likeService;
    private final UserService userService;
    private final CommentService commentService;
    private final LanguagesController languagesController;
    private final GIFService gifService;
    private final ViewedPostService viewedPostService;

    @Autowired
    public GIFDisplayService(LikeService likeService,
                             UserService userService,
                             CommentService commentService,
                             LanguagesController languagesController,
                             GIFService gifService,
                             ViewedPostService viewedPostService) {
        this.likeService = likeService;
        this.userService = userService;
        this.commentService = commentService;
        this.languagesController = languagesController;
        this.gifService = gifService;
        this.viewedPostService = viewedPostService;
    }

    public List<Div> createDivFromGifArray(List<Object[]> gifsAndPfps) {
        List<Div> lout = new ArrayList<>();

        for (Object[] o : gifsAndPfps) {
            final AuroraGIF g = (AuroraGIF) o[0];
            final var username = g.getUser().getUsername();
            final byte[] pfpBytes = (byte[]) o[1];
            Div gifDiv = displaySingleGif(username, g, pfpBytes);
            lout.add(gifDiv);
        }

        return lout;
    }

    public Div displaySingleGif(
            String username,
            AuroraGIF gif,
            byte[] postersPfpBytes) {
        Image image = getImage(gif.getImageData());

        Div gifDiv = new Div();
        gifDiv.addClassName("gif-container");

        Span usernameLabel = new Span(username);
        usernameLabel.addClickListener(l -> {
            UI.getCurrent().navigate(String.format("profile/%s", usernameLabel.getText()));
        });
        Image profilePicture = getImage(postersPfpBytes);
        profilePicture.setWidth("40px");
        profilePicture.setHeight("40px");
        profilePicture.getStyle().set("border-radius", "50%").set("margin-right", "10px");

        HorizontalLayout userInfoLayout = new HorizontalLayout(profilePicture, usernameLabel);
        userInfoLayout.setAlignItems(FlexComponent.Alignment.CENTER);

        Span desc = new Span(String.format("%s", gif.getDescription()));
        desc.getStyle().set("margin-top", "10px");
        //gifDiv.add(desc);

        Button furtherInformationButton = getFurtherInformationButton(gif);
        final var gifId = gif.getId();
        final var likers = likeService.getLikers(gifId);
        Span amountLikes = getAmountLikes(likers);

        final var loggedIn = userService.isLoggedIn();
        Button likeUnlikeButton = getLikeUnlikeButton(loggedIn, gifId, amountLikes);

        updateLikeUnlikeBtnState(likeUnlikeButton, gifId);
        Button openCommentsBtn = getCommentsBtn(gifId);

        HorizontalLayout buttonsLayout = new HorizontalLayout(likeUnlikeButton, openCommentsBtn, furtherInformationButton);
        buttonsLayout.setSpacing(true);
        VerticalLayout gifLayout = getVerticalLayout(userInfoLayout, image, desc, buttonsLayout, amountLikes);
        gifDiv.add(gifLayout);

        if (loggedIn) {
            final var userId = userService.getCurrentUserId();
            if (userService.isUserMod(userId) || gif.getUser().getId().equals(userService.getCurrentUserId())) {
                Button removePostButton = getRemovePostButton(gif);
                gifLayout.add(removePostButton);
            }
        }
        return gifDiv;
    }

    private Button getRemovePostButton(AuroraGIF gif) {
        Button removePostButton = new Button("Remove Post");
        removePostButton.addThemeVariants(ButtonVariant.LUMO_ERROR);
        removePostButton.addClickListener(buttonClickEvent -> {
            if (gifService.delete(gif.getId())) {
                Notification.show("Post removed successfully!", 3000, Notification.Position.BOTTOM_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            }
        });

        return removePostButton;
    }

    private Button getLikeUnlikeButton(boolean loggedIn, Long gifId, Span amountLikes) {
        Button likeUnlikeButton = new Button("Like", VaadinIcon.HEART.create());
        likeUnlikeButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        likeUnlikeButton.addClickListener(buttonClickEvent -> {
            if (loggedIn) {
                final var currentUsername = userService.getCurrentUsername();
                final var currentUserId = userService.getUserIdByUsername(currentUsername).get();

                if (likeService.hasUserAlreadyLikedGIF(currentUserId, gifId)) {
                    likeService.unlikeGif(currentUserId, gifId);
                    likeUnlikeButton.setText(languagesController.get("like"));
                    final var n = Notification.show("Unliked!", 1500, Notification.Position.BOTTOM_CENTER);
                    n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                } else {
                    likeService.likeGif(currentUserId, gifId);
                    AuroraUser current = userService.getUserById(currentUserId);
                    AuroraGIF gif = gifService.getGifById(gifId);
                    likeUnlikeButton.setText(languagesController.get("unlike"));
                    viewedPostService.add(currentUserId, gifId);

                    final var n = Notification.show("Liked!", 1500, Notification.Position.BOTTOM_CENTER);
                    n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                }
            } else {
                final var n = Notification.show("Please log in to like posts.", 1500, Notification.Position.BOTTOM_CENTER);
                n.addThemeVariants(NotificationVariant.LUMO_ERROR);
            }
            updateAmountLikesSpan(likeService, gifId, amountLikes);

        });
        return likeUnlikeButton;
    }

    private Span getAmountLikes(List<Object[]> likers) {
        Span amountLikes = new Span(languagesController.get("liked_by") + " " + likers.size() + " " + languagesController.get("people") + " " + languagesController.get("who"));
        amountLikes.addClickListener(l -> {
            FurtherInformationDialog fd = new FurtherInformationDialog();
            fd.setTitle(languagesController.get("who_likes_this_post"));
            for (Object[] liker : likers) {
                final String likersUsername = (String) liker[0];
                final byte[] pfpBytes = (byte[]) liker[1];
                Div likerCard = getLikerCard(likersUsername, pfpBytes, fd);
                fd.addComponentToDialog(likerCard);
            }
            fd.open();
        });

        return amountLikes;
    }

    public Image getImage(byte[] postersPfpBytes) {
        StreamResource img = new StreamResource("image", () -> new ByteArrayInputStream(postersPfpBytes));
        return new Image(img, "image");
    }

    private VerticalLayout getVerticalLayout(HorizontalLayout userInfoLayout, Image image, Span desc, HorizontalLayout buttonsLayout, Span amountLikes) {
        VerticalLayout gifLayout = new VerticalLayout(userInfoLayout, image, desc, buttonsLayout, amountLikes);
        gifLayout.setDefaultHorizontalComponentAlignment(FlexComponent.Alignment.CENTER);
        gifLayout.getStyle()
                .set("border", "1.5px solid hsl(214, 100%, 70%)")
                .set("padding", "10px")
                .set("border-radius", "10px")
                .set("margin", "10px")
                .set("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.1)");

        return gifLayout;
    }

    private Button getCommentsBtn(Long gifId) {
        Button openCommentsBtn = new Button(VaadinIcon.COMMENT.create());
        openCommentsBtn.addClickListener(l -> {
            CommentsDialog commentsDialog = new CommentsDialog(commentService, userService, languagesController);
            commentsDialog.setWidth("50%");
            commentsDialog.open(gifId);
        });
        return openCommentsBtn;
    }

    private Div getLikerCard(String likersUsername, byte[] profilePictureBytes, FurtherInformationDialog fd) {
        Image profileImage = getImage(profilePictureBytes);

        profileImage.getStyle()
                .set("border-radius", "50%")
                .setWidth("50px")
                .setHeight("50px");

        Div likerCard = new Div();
        likerCard.addClassName("liker-card");
        likerCard.getStyle()
                .set("display", "flex")
                .set("align-items", "center")
                .set("padding", "10px")
                .set("margin", "10px 0")
                .set("border", "1px solid #ccc")
                .set("border-radius", "8px")
                .set("box-shadow", "0 2px 5px rgba(0, 0, 0, 0.1)");

        likerCard.addClickListener(l -> {
            // check if same
            if (userService.getCurrentUsername().equals(likersUsername)) {
                UI.getCurrent().navigate(MyProfileView.class);
            } else {
                UI.getCurrent().navigate(String.format("/profile/%s", likersUsername));
            }
            fd.close();
        });
        Span likerNameSpan = new Span(likersUsername);
        likerNameSpan.getStyle().set("margin-left", "10px");
        likerCard.add(profileImage, likerNameSpan);

        return likerCard;
    }

    private Button getFurtherInformationButton(AuroraGIF gif) {
        Button button = new Button("", VaadinIcon.INFO.create());
        button.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        button.addClickListener(l -> {
            FurtherInformationDialog furtherInformationDialog = new FurtherInformationDialog();
            VerticalLayout contentLayout = new VerticalLayout();
            contentLayout.setSpacing(true);

            final List<String> categoriesList = gifService.getGifsCategories(gif.getId());
            for (String category : categoriesList) {
                Span s = new Span(String.format("#%s ", category));
                s.getStyle().set("padding", "2px 0");
                contentLayout.add(s);
            }

            furtherInformationDialog.addComponentToDialog(contentLayout);
            furtherInformationDialog.open();
        });

        return button;
    }

    private void updateLikeUnlikeBtnState(Button likeUnlikeButton, Long gifId) {
        if (userService.isLoggedIn()) {
            final var currentUsername = userService.getCurrentUsername();
            final var currentUserId = userService.getUserIdByUsername(currentUsername).get();

            if (likeService.hasUserAlreadyLikedGIF(currentUserId, gifId)) {
                likeUnlikeButton.setText(languagesController.get("unlike"));
            } else {
                likeUnlikeButton.setText(languagesController.get("like"));
            }
        } else {
            likeUnlikeButton.setText(languagesController.get("like"));
        }
    }

    private void updateAmountLikesSpan(LikeService likeService,
                                       Long gifId,
                                       Span amountLikes) {
        Long currentAmountLikes = likeService.getAmountOfLikes(gifId);
        amountLikes.setText(languagesController.get("liked_by") + " " + currentAmountLikes + " " + languagesController.get("people") + " " + languagesController.get("who"));
    }

    public static void notify(String text) {
        final var n = Notification.show(text, 1000, Notification.Position.BOTTOM_CENTER);
        n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
    }
}
