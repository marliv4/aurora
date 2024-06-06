package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.BelongsTo;
import com.livajusic.marko.aurora.tables.GifCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GifCategoryRepo extends JpaRepository<GifCategory, Long> {
    Optional<GifCategory> findByCategory(String category);

}
