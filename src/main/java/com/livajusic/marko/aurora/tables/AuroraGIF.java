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
    private Integer gifId;

    @Column(unique = true)
    private String path;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AuroraUser user;

    @Column
    private Date publishDate;

    @Column
    private String licence;

    @OneToMany(mappedBy = "gif")
    private Set<BelongsTo> categories;

    public Set<BelongsTo> getCategories() {
        return categories;
    }

    public void setCategories(Set<BelongsTo> categories) {
        this.categories = categories;
    }

    public AuroraGIF() {}
    public AuroraGIF(String path, AuroraUser user, Date publishDate, String licence) {
        this.path = path;
        this.user = user;
        this.publishDate = publishDate;
        this.licence = licence;
    }

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

    public String getLicence() {
        return licence;
    }

    public void setLicence(String licence) {
        this.licence = licence;
    }
}
