package com.livajusic.marko.aurora.tables;

import com.livajusic.marko.aurora.tables.composite_keys.LikeId;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "Likes")
public class Like implements Serializable {
    @EmbeddedId
    private LikeId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private AuroraUser user;

    @ManyToOne
    @MapsId("gifId")
    @JoinColumn(name = "gif_id")
    private AuroraGIF gif;

    public Like() {}

    public Like(AuroraUser user, AuroraGIF gif) {
        this.user = user;
        this.gif = gif;
        this.id = new LikeId(user.getId(), gif.getId());
    }

    public LikeId getId() {
        return id;
    }

    public void setId(LikeId id) {
        this.id = id;
    }

    public AuroraUser getUser() {
        return user;
    }

    public void setUser(AuroraUser user) {
        this.user = user;
    }

    public AuroraGIF getGif() {
        return gif;
    }

    public void setGif(AuroraGIF gif) {
        this.gif = gif;
    }
}
