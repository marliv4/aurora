package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.PrivacySettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivacySettingsRepo extends JpaRepository<PrivacySettings, Long> {
}
