package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "AuroraUsers")
public class AuroraUser {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long userId;
    @Column(unique = true)
    private String username;
    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<AuroraGIF> gifs;

    @OneToMany(mappedBy = "user")
    private Set<Like> likes;

    public AuroraUser() {}

    public AuroraUser(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return userId;
    }

    public void setId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
