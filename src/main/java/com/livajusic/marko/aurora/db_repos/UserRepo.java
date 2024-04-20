package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.AuroraUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<AuroraUser, Integer> {
}
