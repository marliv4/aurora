package com.livajusic.marko.aurora.tables.composite_keys;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class LikeId implements Serializable {
    private Long userId;
    private Long gifId;

    public LikeId() {}

    public LikeId(Long userId, Long gifId) {
        this.userId = userId;
        this.gifId = gifId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getGifId() {
        return gifId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setGifId(Long gifId) {
        this.gifId = gifId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, gifId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LikeId likeId = (LikeId) o;
        return Objects.equals(userId, likeId.userId) &&
                Objects.equals(gifId, likeId.gifId);
    }
}
