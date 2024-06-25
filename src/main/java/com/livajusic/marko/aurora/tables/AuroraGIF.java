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
    private String description;

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
    public AuroraGIF(byte[] imageData, AuroraUser user, Date publishDate, String description) {
        this.imageData = imageData;
        this.user = user;
        this.publishDate = publishDate;
        this.description = description;
    }

    public Long getId() { return gifId; }

    public void setGifId(Long gifId) {
        this.gifId = gifId;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
