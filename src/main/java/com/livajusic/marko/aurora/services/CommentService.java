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

import com.livajusic.marko.aurora.db_repos.CommentRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Comment> getCommentsByGifId(Long gifId) {
        return commentRepo.findByGifId(gifId);
    }
}
