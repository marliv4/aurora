package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.AuroraGIF;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GifRepo extends JpaRepository<AuroraGIF, Long> {
    Long countByUserId(Long userId);
}
