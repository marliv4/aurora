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

import com.livajusic.marko.aurora.LanguagesController;
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
    private final LanguagesController languagesController;

    public CommentsDialog(CommentService commentService,
                          UserService userService,
                          LanguagesController languagesController) {
        super();
        this.commentService = commentService;
        this.userService = userService;
        this.commentsLayout = new VerticalLayout();
        this.commentInputLayout = new VerticalLayout();
        this.languagesController = languagesController;
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

            Span userDetails = new Span();
            userDetails.setText("@" + comment.getUser().getUsername() +
                    " • " + comment.getCreatedAt().format(DateTimeFormatter.ofPattern("dd.MM.yy HH:mm")) + ":");

            commentsLayout.add(userDetails, commentText);
        }

        addComponentToDialog(commentsLayout);
    }

    private void addCommentField(Long gifId) {
        commentField = new TextField();
        commentField.setPlaceholder(languagesController.get("add_a_comment"));
        commentField.setWidth("100%");

        Button submitButton = new Button(languagesController.get("submit"));
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
            commentService.addComment(userId, gifId, txt);
            commentField.clear();
            showComments(gifId);
        }
    }
}
