package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.ProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfilePictureRepo extends JpaRepository<ProfilePicture, Long> {
    Optional<ProfilePicture> findByUserId(Long userId);
    long countByUserUserId(Long userId);
}
