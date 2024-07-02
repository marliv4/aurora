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
package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.db_repos.ViewedPostRepo;
import com.livajusic.marko.aurora.tables.ViewedPost;
import org.springframework.stereotype.Service;

@Service
public class ViewedPostService {
    private final ViewedPostRepo viewedPostRepo;

    public ViewedPostService(ViewedPostRepo viewedPostRepo) {
        this.viewedPostRepo = viewedPostRepo;
    }

    public void add(Long userId, Long gifId) {
        ViewedPost viewedPost = new ViewedPost(userId, gifId);
        viewedPostRepo.save(viewedPost);
    }
}
