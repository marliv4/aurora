package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;
import org.hibernate.annotations.Type;
import org.hibernate.engine.jdbc.env.internal.LobTypes;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "aurora_gifs")
public class AuroraGIF {
    @Id
    @GeneratedValue
    private Long gifId;

    @Column(name = "data", columnDefinition="bytea")
    private byte[] imageData;

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
    public AuroraGIF(byte[] imageData, AuroraUser user, Date publishDate, String license) {
        this.imageData = imageData;
        this.user = user;
        this.publishDate = publishDate;
        this.license = license;
    }

    public Long getId() { return gifId; }

    public byte[] getImageData() {
        return imageData;
    }
    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public void setPath(byte[] imageData) {
        this.imageData = imageData;
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
