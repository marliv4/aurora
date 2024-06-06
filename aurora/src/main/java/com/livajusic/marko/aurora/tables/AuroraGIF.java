package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "aurora_gifs")
public class AuroraGIF {
    @Id
    @GeneratedValue
    private Long gifId;

    @Column(unique = true)
    private String path;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AuroraUser user;

    @Column
    private Date publishDate;

    @Column
    private String license;

    @OneToMany(mappedBy = "gif")
    private Set<BelongsTo> categories;

    @OneToMany(mappedBy = "gif")
    private Set<Like> likes;

    public Set<BelongsTo> getCategories() {
        return categories;
    }

    public void setCategories(Set<BelongsTo> categories) {
        this.categories = categories;
    }

    public AuroraGIF() {}
    public AuroraGIF(String path, AuroraUser user, Date publishDate, String license) {
        this.path = path;
        this.user = user;
        this.publishDate = publishDate;
        this.license = license;
    }

    public Long getId() { return gifId; }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public AuroraUser getUser() {
        return user;
    }

    public void setUser(AuroraUser user) {
        this.user = user;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }
}
