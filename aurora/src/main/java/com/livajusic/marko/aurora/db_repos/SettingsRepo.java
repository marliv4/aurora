package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.Settings;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SettingsRepo extends JpaRepository<Settings, Long> {
    Optional<Settings> findByUserId(Long userId);
}
