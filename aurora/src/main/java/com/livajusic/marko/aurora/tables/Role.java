package com.livajusic.marko.aurora.tables;

import com.livajusic.marko.aurora.tables.composite_keys.RoleId;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "roles")
@IdClass(RoleId.class)
public class Role {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Id
    @Column(name = "role")
    private String role;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private AuroraUser user;

    public Role() {}

    public Role(Long userId, String role) {
        this.userId = userId;
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public AuroraUser getUser() {
        return user;
    }

    public void setUser(AuroraUser user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role1 = (Role) o;
        return Objects.equals(userId, role1.userId) && Objects.equals(role, role1.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, role);
    }
}