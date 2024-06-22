/*
 * This file is part of Aurora.
 *
 * Aurora is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Aurora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Aurora. If not, see <https://www.gnu.org/licenses/>.
 *
 * Author: Marko Livajusic
 * Email: marko.livajusic4 <at> gmail.com
 * Copyright: (C) 2024 Marko Livajusic
 */
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
