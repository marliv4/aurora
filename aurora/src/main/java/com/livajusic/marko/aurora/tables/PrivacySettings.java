package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

@Entity
@Table(name = "privacy_settings")
public class PrivacySettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AuroraUser user;

    @Column
    private int privacyEnabled;

    public PrivacySettings() {}
    public PrivacySettings(AuroraUser user, int privacyEnabled) {
        this.user = user;
        this.privacyEnabled = privacyEnabled;
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

    public int isPrivacyEnabled() {
        return privacyEnabled;
    }

    public void setPrivacyEnabled(int privacyEnabled) {
        this.privacyEnabled = privacyEnabled;
    }
}

