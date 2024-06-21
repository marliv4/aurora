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

import com.livajusic.marko.aurora.db_repos.BelongsToRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.sql.PreparedStatement;

@Service
public class GIFService {
    private final GifRepo gifRepo;
    private final EntityManager entityManager;
    private final BelongsToRepo belongsToRepo;

    public GIFService(GifRepo gifRepo,
                      EntityManager entityManager,
                      BelongsToRepo belongsToRepo) {
        this.gifRepo = gifRepo;
        this.entityManager = entityManager;
        this.belongsToRepo = belongsToRepo;
    }

    @Transactional
    public boolean delete(Long gifId) {
        try {
            belongsToRepo.deleteByGifId(gifId);
            gifRepo.deleteById(gifId);
            // delete likes, comments
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
