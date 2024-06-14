package com.livajusic.marko.aurora.views.dialogs;

import com.livajusic.marko.aurora.services.CommentService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.tables.Comment;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;

import java.time.format.DateTimeFormatter;

public class CommentsDialog extends BaseDialog {
    private final CommentService commentService;
    private final UserService userService;
    private final VerticalLayout commentsLayout;
    private final VerticalLayout commentInputLayout;
    private TextField commentField;

    public CommentsDialog(CommentService commentService,
                          UserService userService) {
        super();
        this.commentService = commentService;
        this.userService = userService;
        this.commentsLayout = new VerticalLayout();
        this.commentInputLayout = new VerticalLayout();

    }

    @Override
    public void open(Long gifId) {
        super.open();
        showComments(gifId);
        addCommentField(gifId);
        open();

    }

    private void showComments(Long gifId) {
        commentsLayout.removeAll();
        final var comments = commentService.getCommentsByGifId(gifId);

        VerticalLayout layout = new VerticalLayout();
        layout.setSpacing(true);

        for (Comment comment : comments) {
            TextField commentText = new TextField();
            commentText.setValue(comment.getCommentText());
            commentText.setReadOnly(true);
            commentText.setWidth("100%");
            commentText.getStyle().set("border", "1px solid #ccc")
                    .set("padding", "10px")
                    .set("border-radius", "10px")
                    .set("margin-bottom", "10px");

            Span userDetails = new Span();
            userDetails.setText("@" + comment.getUser().getUsername() +
                    " • " + comment.getCreatedAt().format(DateTimeFormatter.ofPattern("dd.MM.yy HH:mm")) + ":");

            commentsLayout.add(commentText, userDetails);
        }

        addComponentToDialog(commentsLayout);
    }

    private void addCommentField(Long gifId) {
        commentField = new TextField();
        commentField.setPlaceholder("Add a comment...");
        commentField.setWidth("100%");

        Button submitButton = new Button("Submit");
        submitButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        if (userService.isLoggedIn()) {
            submitButton.addClickListener(event -> {
                System.out.println("submitButton.addClick");
                submitComment(commentField.getValue(), gifId);
            });
        }

        commentInputLayout.add(commentField, submitButton);
        addComponentToDialog(commentsLayout);
        addComponentToDialog(commentInputLayout);
    }

    private void submitComment(String txt,
                               Long gifId) {
        if (!txt.isEmpty()) {
            final Long userId = userService.getCurrentUserId();

            System.out.println("ADDING COMMENT. PLEASE WAIT.");
            commentService.addComment(userId, gifId, txt);
            commentField.clear();
            showComments(gifId);
        }
    }
}