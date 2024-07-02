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

import com.livajusic.marko.aurora.tables.composite_keys.ViewedPostId;
import com.livajusic.marko.aurora.views.UploadView;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "viewedposts")
public class ViewedPost {

    @EmbeddedId
    private ViewedPostId id;

    @Column(name = "viewed_at")
    private Date viewedAt;

    public ViewedPost() {

    }

    public ViewedPost(Long userId, Long gifId) {
        ViewedPostId viewedPostId = new ViewedPostId(userId, gifId);
        this.id = viewedPostId;

        this.viewedAt = UploadView.AuroraDateManager.getSqlDate(UploadView.AuroraDateManager.getUtilDate());
    }

    public ViewedPostId getId() {
        return id;
    }

    public void setId(ViewedPostId id) {
        this.id = id;
    }

    public Date getViewedAt() {
        return viewedAt;
    }

    public void setViewedAt(Date viewedAt) {
        this.viewedAt = viewedAt;
    }
}
