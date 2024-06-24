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
import com.livajusic.marko.aurora.db_repos.GifCategoryRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.BelongsTo;
import com.livajusic.marko.aurora.tables.GifCategory;
import com.livajusic.marko.aurora.views.UploadView;
import com.vaadin.flow.component.UI;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GIFService {
    private final GifRepo gifRepo;
    private final EntityManager entityManager;
    private final BelongsToRepo belongsToRepo;
    private final GifCategoryRepo gifCategoryRepo;

    public GIFService(GifRepo gifRepo,
                      EntityManager entityManager,
                      BelongsToRepo belongsToRepo,
                      GifCategoryRepo gifCategoryRepo) {
        this.gifRepo = gifRepo;
        this.entityManager = entityManager;
        this.belongsToRepo = belongsToRepo;
        this.gifCategoryRepo = gifCategoryRepo;
    }

    @Transactional
    public void deleteFromBelongsToRepo(Long gifId) {
        Query query = entityManager.createQuery("DELETE FROM BelongsTo WHERE gif.id = :gifId");
        query.setParameter("gifId", gifId);
        query.executeUpdate();
    }

    @Transactional
    public void deleteFromLikesRepo(Long gifId) {
        Query query = entityManager.createQuery("DELETE FROM Like WHERE gif.id = :gifId");
        query.setParameter("gifId", gifId);
        query.executeUpdate();
    }

    @Transactional
    public void deleteFromCommentsRepo(Long gifId) {
        Query query = entityManager.createQuery("DELETE FROM Comment WHERE gif.id = :gifId");
        query.setParameter("gifId", gifId);
        query.executeUpdate();
    }

    @Transactional
    public boolean delete(Long gifId) {
        try {
            deleteFromBelongsToRepo(gifId);
            deleteFromLikesRepo(gifId);
            deleteFromCommentsRepo(gifId);
            gifRepo.deleteById(gifId);
            UI.getCurrent().getPage().reload();
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
        Timestamp queryRes = (Timestamp) list.get(0);
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

    public List<String> getGifsCategories(Long gifId) {
        Query query = entityManager.createQuery(
                "SELECT gc.category " +
                        "FROM BelongsTo bt " +
                        "JOIN bt.category gc " +
                        "WHERE bt.gif.id = :gifId"
        );
        query.setParameter("gifId", gifId);
        return (List<String>) query.getResultList();
    }

    @Transactional
    public List<AuroraGIF> filterGifsByCategory(String categoryCsv) {
        List<AuroraGIF> filteredGifs = new ArrayList<>();
        List<String> categoriesList = Arrays.asList(categoryCsv.split(","));

        Query query = entityManager.createQuery("SELECT ag, bt.category.id FROM AuroraGIF ag " +
                "JOIN BelongsTo bt " +
                "ON ag.gifId = bt.gif.gifId " +
                "JOIN GifCategory gc " +
                "ON bt.category.categoryId = gc.categoryId " +
                "WHERE gc.category IN :categories");

        query.setParameter("categories", categoriesList);
        List<Object[]> results = (List<Object[]>) query.getResultList();
        for (Object[] result : results) {
            AuroraGIF gif = (AuroraGIF) result[0];
            filteredGifs.add(gif);
        }
        return filteredGifs;
    }

    public List<AuroraGIF> filterGivenGifsByCategory(List<Long> gifIds, List<String> categories) {
        Query query = entityManager.createQuery("SELECT DISTINCT ag " +
                "FROM AuroraGIF ag " +
                "JOIN BelongsTo bt ON ag.gifId = bt.gif.gifId " +
                "JOIN GifCategory gc ON bt.category.categoryId = gc.categoryId " +
                "WHERE gc.category IN (:categories) " +
                "AND ag.gifId IN (:gifIds)");

        query.setParameter("categories", categories);
        query.setParameter("gifIds", gifIds);

        final var filteredGifs = query.getResultList();
        if (filteredGifs.isEmpty()) return null;

        return filteredGifs;
    }

    public List<Object[]> getAllGifsWithPfp() {
        Query query = entityManager.createQuery("SELECT ag, pfp.imageData " +
                "FROM AuroraGIF ag " +
                "JOIN ProfilePicture pfp " +
                "ON ag.user.userId = pfp.user.userId");
        final var list = query.getResultList();
        if (list.isEmpty()) return null;

        return list;
    }
}
