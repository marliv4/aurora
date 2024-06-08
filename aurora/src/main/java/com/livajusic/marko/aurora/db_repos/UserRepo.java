package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.AuroraUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<AuroraUser, Long> {
    Optional<AuroraUser> findByUsername(String username);
    Optional<AuroraUser> findByEmail(String email);
}
