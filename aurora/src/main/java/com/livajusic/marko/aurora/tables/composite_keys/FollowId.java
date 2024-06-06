package com.livajusic.marko.aurora.tables.composite_keys;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FollowId implements Serializable {
    private Long userId;
    private Long followsUserId;

    public FollowId() {}

    public FollowId(Long userId, Long followsUserId) {
        this.userId = userId;
        this.followsUserId = followsUserId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getFollowsUserId() {
        return followsUserId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFollowsUserId(Long followsUserId) {
        this.followsUserId = followsUserId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, followsUserId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FollowId followId = (FollowId) o;

        return Objects.equals(userId, followId.userId) &&
                Objects.equals(followsUserId, followId.followsUserId);
    }
}
