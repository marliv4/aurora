package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

@Entity
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AuroraUser user;

    @ManyToOne
    @JoinColumn(name = "gif_id", nullable = false)
    private AuroraGIF gif;

    public Like() {}

    public Like(AuroraUser user, AuroraGIF gif) {
        this.user = user;
        this.gif = gif;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
