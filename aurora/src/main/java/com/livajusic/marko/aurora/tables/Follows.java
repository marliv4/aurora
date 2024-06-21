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

import com.livajusic.marko.aurora.tables.composite_keys.FollowId;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="Follows")
public class Follows {
    @EmbeddedId
    private FollowId id;

    private LocalDateTime followedAt;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private AuroraUser user;


    @ManyToOne
    @MapsId("followsUserId")
    @JoinColumn(name = "follows_user_id")
    private AuroraUser followsUser;

    public Follows() {}

    public Follows(FollowId id, AuroraUser user, AuroraUser followsUser, LocalDateTime followedAt) {
        this.id = id;
        this.user = user;
        this.followsUser = followsUser;
        this.followedAt = followedAt;
    }

    public FollowId getId() {
        return id;
    }

    public void setId(FollowId id) {
        this.id = id;
    }

    public AuroraUser getUser() {
        return user;
    }

    public void setUser(AuroraUser user) {
        this.user = user;
    }

    public AuroraUser getFollowsUser() {
        return followsUser;
    }

    public void setFollowsUser(AuroraUser followsUser) {
        this.followsUser = followsUser;
    }

    public LocalDateTime getFollowedAt() {
        return followedAt;
    }

    public void setFollowedAt(LocalDateTime followedAt) {
        this.followedAt = followedAt;
    }
}
