package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

@Entity
@Table(name = "settings")
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AuroraUser user;

    @Column
    private int othersCanSeeMyFollowers;

    @Column
    private int othersCanSeeWhoIAmFollowing;

    @Column
    private String language;

    @Column
    private String theme;

    public Settings() {}

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public Settings(AuroraUser user,
                    int othersCanSeeMyFollowers,
                    int othersCanSeeWhoIAmFollowing,
                    String language,
                    String theme) {
        this.user = user;
        this.othersCanSeeMyFollowers = othersCanSeeMyFollowers;
        this.othersCanSeeWhoIAmFollowing = othersCanSeeWhoIAmFollowing;
        this.language = language;
        this.theme = theme;
    }

    public int getOthersCanSeeMyFollowers() {
        return othersCanSeeMyFollowers;
    }

    public void setOthersCanSeeMyFollowers(int othersCanSeeMyFollowers) {
        this.othersCanSeeMyFollowers = othersCanSeeMyFollowers;
    }

    public int getOthersCanSeeWhoIAmFollowing() {
        return othersCanSeeWhoIAmFollowing;
    }

    public void setOthersCanSeeWhoIAmFollowing(int othersCanSeeWhoIAmFollowing) {
        this.othersCanSeeWhoIAmFollowing = othersCanSeeWhoIAmFollowing;
    }


    public Long getId() {
        return id;
    }

    public AuroraUser getUser() {
        return user;
    }

    public void setUser(AuroraUser user) {
        this.user = user;
    }
}

