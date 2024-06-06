package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.composite_keys.FollowId;
import com.livajusic.marko.aurora.tables.Follows;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepo extends JpaRepository<Follows, FollowId> {
    boolean existsById(FollowId id);
}
