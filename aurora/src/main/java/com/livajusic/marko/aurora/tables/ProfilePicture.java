package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

@Entity
@Table(name = "ProfilePictures")
public class ProfilePicture {
    @Id
    @GeneratedValue
    @Column(name = "picture_id")
    private Long pictureId;

    @Column(name = "imageData", columnDefinition="bytea")
    private byte[] imageData;

    @OneToOne
    @JoinColumn(name = "user_id")
    private AuroraUser user;

    public ProfilePicture() {}

    public ProfilePicture(byte[] imageData, AuroraUser user) {
        this.imageData = imageData;
        this.user = user;
    }

    public Long getPictureId() {
        return pictureId;
    }

    public void setPictureId(Long pictureId) {
        this.pictureId = pictureId;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public AuroraUser getUser() {
        return user;
    }

    public void setUser(AuroraUser user) {
        this.user = user;
    }
}
