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
package com.livajusic.marko.aurora.tables.composite_keys;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FollowId implements Serializable {
    private Long userId;
    private Long followsUserId;

    public FollowId() {}

    public FollowId(Long userId, Long followsUserId) {
        this.userId = userId;
        this.followsUserId = followsUserId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getFollowsUserId() {
        return followsUserId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setFollowsUserId(Long followsUserId) {
        this.followsUserId = followsUserId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, followsUserId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FollowId followId = (FollowId) o;

        return Objects.equals(userId, followId.userId) &&
                Objects.equals(followsUserId, followId.followsUserId);
    }
}
