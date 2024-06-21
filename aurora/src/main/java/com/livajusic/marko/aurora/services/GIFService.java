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
import com.livajusic.marko.aurora.views.UploadView;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

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

    public String getPublishDateOfRecentGIF(Long userId) {
        Query query = entityManager.createQuery("SELECT publishDate " +
                "from AuroraGIF " +
                "WHERE user.userId = :userId " +
                "ORDER BY publishDate DESC " +
                "LIMIT 1");
        query.setParameter("userId", userId);
        // query.setMaxResults(1);

        final var list = query.getResultList();
        if (list.isEmpty()) {
            return "";
        }
        Timestamp queryRes = (Timestamp)list.get(0);
        return DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(queryRes.toLocalDateTime());
    }

    public boolean hasUserUploadedGIFInLastNMinutes(Long userId, int nMinutes) {
        final String recentPublishDateStr = getPublishDateOfRecentGIF(userId);
        if (recentPublishDateStr.isEmpty()) {
            return false;
        }

        LocalDateTime recentPublishDate = LocalDateTime.parse(recentPublishDateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        LocalDateTime currentTime = LocalDateTime.now();
        long minutesBetween = ChronoUnit.MINUTES.between(recentPublishDate, currentTime);

        return minutesBetween <= nMinutes;
    }
}
