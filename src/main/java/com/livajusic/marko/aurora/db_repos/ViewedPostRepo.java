package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.ViewedPost;
import com.livajusic.marko.aurora.tables.composite_keys.ViewedPostId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewedPostRepo extends JpaRepository<ViewedPost, ViewedPostId> {
}
