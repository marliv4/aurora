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
    private int privateProfile;

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
                    int privateProfile,
                    String language,
                    String theme) {
        this.user = user;
        this.privateProfile = privateProfile;
        this.language = language;
        this.theme = theme;
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

    public int isPrivateProfile() {
        return privateProfile;
    }

    public void setPrivacyEnabled(int privateProfile) {
        this.privateProfile = privateProfile;
    }
}

