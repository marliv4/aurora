package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.views.dialogs.CommentsDialog;
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
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;

@Service
public class GIFDisplayService {
    private final LikeService likeService;
    private final UserService userService;
    private final CommentService commentService;
    private final LanguagesController languagesController;

    @Autowired
    public GIFDisplayService(LikeService likeService,
                             UserService userService,
                             CommentService commentService,
                             LanguagesController languagesController) {
        this.likeService = likeService;
        this.userService = userService;
        this.commentService = commentService;
        this.languagesController = languagesController;
    }

    public Div displaySingleGif(
            String username,
            AuroraGIF gif) {
        StreamResource resource = new StreamResource("ThisNameIsIrrelevant.",
                () -> new ByteArrayInputStream(gif.getImageData()));

        System.out.println("RESOURCE: " + resource);
        Image image = new Image(resource, "GIF");

        Div gifDiv = new Div();
        gifDiv.addClassName("gif-container");

        Span usernameLabel = new Span(languagesController.get("by") + ": " + username);

        Button likeUnlikeButton = new Button("Like", VaadinIcon.HEART.create());
        likeUnlikeButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        boolean likedAlready = false;

        final var gifId = gif.getId();
        Span amountLikes = new Span(languagesController.get("liked_by") + " " + likeService.getAmountOfLikes(gifId)
                + " " +languagesController.get("people"));
        updateLikeUnlikeBtnState(likeUnlikeButton, gifId);
        final var loggedIn = userService.isLoggedIn();
        likeUnlikeButton.addClickListener(buttonClickEvent -> {
            if (loggedIn) {
                final var currentUsername = userService.getCurrentUsername();
                final var currentUserId = userService.getUserIdByUsername(currentUsername);

                if (likeService.hasUserAlreadyLikedGIF(currentUserId, gifId)) {
                    likeService.unlikeGif(currentUserId, gifId);
                    likeUnlikeButton.setText(languagesController.get("like"));
                    final var n = Notification.show("Unliked!", 500, Notification.Position.BOTTOM_CENTER);
                    n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                } else {
                    likeService.likeGif(currentUserId, gifId);
                    likeUnlikeButton.setText(languagesController.get("unlike"));
                    final var n = Notification.show("Liked!", 500, Notification.Position.BOTTOM_CENTER);
                    n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                }
            } else {
                final var n = Notification.show("Please log in to like posts.", 500, Notification.Position.BOTTOM_CENTER);
                n.addThemeVariants(NotificationVariant.LUMO_ERROR);
            }
            updateAmountLikesSpan(likeService, gifId, amountLikes);

        });

        Button openCommentsBtn = new Button(VaadinIcon.COMMENT.create());
        openCommentsBtn.addClickListener(l -> {
            CommentsDialog commentsDialog = new CommentsDialog(commentService, userService, languagesController);
            commentsDialog.setWidth("50%");
            commentsDialog.open(gifId);
        });

        HorizontalLayout buttonsLayout = new HorizontalLayout(likeUnlikeButton, openCommentsBtn);
        buttonsLayout.setSpacing(true);

        VerticalLayout gifLayout = new VerticalLayout(usernameLabel, image, buttonsLayout, amountLikes);
        gifLayout.setDefaultHorizontalComponentAlignment(FlexComponent.Alignment.CENTER);
        gifLayout.getStyle().set("border", "1.5px solid hsl(214, 100%, 70%)")
                .set("padding", "10px")
                .set("border-radius", "10px")
                .set("margin", "10px")
                .set("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.1)");
        gifDiv.add(gifLayout);

        if (loggedIn) {
            final var userId = userService.getCurrentUserId();
            if (userService.isUserMod(userId)) {
                /*
                Button removePostButton = new Button("Remove Post");
                removePostButton.addThemeVariants(ButtonVariant.LUMO_ERROR);
                removePostButton.addClickListener(buttonClickEvent -> {
                    // gifRepo.deleteById(gif.getId());

                    Notification.show("Post removed successfully!", 3000, Notification.Position.BOTTOM_CENTER)
                            .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                    // remove(gifDiv
                });

                gifLayout.add(removePostButton);
                */
            }
        }

        return gifDiv;
    }

    private void updateLikeUnlikeBtnState(Button likeUnlikeButton, Long gifId) {
        if (userService.isLoggedIn()) {
            final var currentUsername = userService.getCurrentUsername();
            final var currentUserId = userService.getUserIdByUsername(currentUsername);

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
        amountLikes.setText(languagesController.get("liked_by") + " " + String.valueOf(currentAmountLikes) + " people");
    }

    public static void notify(String text) {
        final var n = Notification.show(text, 1000, Notification.Position.BOTTOM_CENTER);
        n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
    }
}
