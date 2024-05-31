package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

@Entity
@Table(name = "Likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AuroraUser user;

    @ManyToOne
    @JoinColumn(name = "gif_id")
    private AuroraGIF gif;

    public Like() {}
    public Like(AuroraUser user, AuroraGIF gif) {
        this.user = user;
        this.gif = gif;
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
