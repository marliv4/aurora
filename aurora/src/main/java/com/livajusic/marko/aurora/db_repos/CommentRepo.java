package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Long> {
}
