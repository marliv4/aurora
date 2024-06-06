package com.livajusic.marko.aurora.tables;

import com.livajusic.marko.aurora.tables.composite_keys.FollowId;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="Follows")
public class Follows {
    @EmbeddedId
    private FollowId id;

    private LocalDateTime followedAt;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private AuroraUser user;


    @ManyToOne
    @MapsId("followsUserId")
    @JoinColumn(name = "follows_user_id")
    private AuroraUser followsUser;

    public Follows() {}

    public Follows(FollowId id, AuroraUser user, AuroraUser followsUser, LocalDateTime followedAt) {
        this.id = id;
        this.user = user;
        this.followsUser = followsUser;
        this.followedAt = followedAt;
    }

    public FollowId getId() {
        return id;
    }

    public void setId(FollowId id) {
        this.id = id;
    }

    public AuroraUser getUser() {
        return user;
    }

    public void setUser(AuroraUser user) {
        this.user = user;
    }

    public AuroraUser getFollowsUser() {
        return followsUser;
    }

    public void setFollowsUser(AuroraUser followsUser) {
        this.followsUser = followsUser;
    }

    public LocalDateTime getFollowedAt() {
        return followedAt;
    }

    public void setFollowedAt(LocalDateTime followedAt) {
        this.followedAt = followedAt;
    }
}
