package com.livajusic.marko.aurora.db_repos;

import com.livajusic.marko.aurora.tables.Role;
import com.livajusic.marko.aurora.tables.composite_keys.RoleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, RoleId> {
}
