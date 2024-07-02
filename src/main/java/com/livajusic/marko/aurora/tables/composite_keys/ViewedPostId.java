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
public class ViewedPostId implements Serializable {

    private Long gifId;
    private Long userId;

    public ViewedPostId() {}

    public ViewedPostId(Long userId, Long gifId) {
        this.userId = userId;
        this.gifId = gifId;
    }

    public Long getGifId() {
        return gifId;
    }

    public void setGifId(Long gifId) {
        this.gifId = gifId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(gifId, userId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        ViewedPostId that = (ViewedPostId) obj;
        return Objects.equals(gifId, that.gifId) && Objects.equals(userId, that.userId);
    }
}
