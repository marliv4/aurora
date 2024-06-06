package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepo extends JpaRepository<Like, Long> {
    Like findByUserIdAndGifId(Long userId, Long gifId);
}
