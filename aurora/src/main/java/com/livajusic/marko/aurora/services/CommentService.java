package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.db_repos.CommentRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;

    private final UserRepo userRepo;
    private final GifRepo gifRepo;

    public CommentService(UserRepo userRepo, GifRepo gifRepo) {
        this.userRepo = userRepo;
        this.gifRepo = gifRepo;
    }

    public Comment addComment(Long userId, Long gifId, String commentText) {
        AuroraUser user = userRepo.findById(userId).orElseThrow();
        AuroraGIF gif = gifRepo.findById(gifId).orElseThrow();

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setGif(gif);
        comment.setCommentText(commentText);

        return commentRepo.save(comment);
    }
}
