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

import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.LikeRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.Like;
import com.vaadin.flow.component.notification.Notification;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    private final UserRepo userRepository;
    private final GifRepo gifRepository;
    private final LikeRepo likeRepository;

    private EntityManager entityManager;
    @Autowired
    public LikeService(
            UserRepo userRepo,
            GifRepo gifRepo,
            LikeRepo likeRepo,
            EntityManager entityManager) {
        this.userRepository = userRepo;
        this.gifRepository = gifRepo;
        this.likeRepository = likeRepo;
        this.entityManager = entityManager;
    }

    @Transactional
    public void likeGif(Long userId, Long gifId) {
        System.out.println("likeGif");
        AuroraUser user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        AuroraGIF gif = gifRepository.findById(gifId).orElseThrow(() -> new RuntimeException("GIF not found"));

        Like like = new Like(user, gif);
        likeRepository.save(like);
    }

    @Transactional
    public void unlikeGif(Long userId, Long gifId) {
        Like like = likeRepository.findByUserIdAndGifId(userId, gifId);
        likeRepository.delete(like);
    }

    public Long getAmountOfLikes(Long gifId) {
        var query = entityManager.createQuery("SELECT COUNT(l.user.id) " +
                "FROM Like l " +
                "WHERE l.gif.id = :gifId", Long.class);
        query.setParameter("gifId", gifId);
        return (Long) query.getSingleResult();
    }

    public boolean hasUserAlreadyLikedGIF(Long userId, Long gifId) {
        final var query = entityManager.createQuery("SELECT COUNT(1) " +
                "FROM Like l " +
                "WHERE l.user.userId = :userId " +
                "AND l.gif.gifId = :gifId");
        query.setParameter("userId", userId);
        query.setParameter("gifId", gifId);

        return (Long)query.getSingleResult() > 0;
    }

    public List<Object[]> getLikers(Long gifId) {
        final Query query = entityManager.createQuery("SELECT au.username, pfp.imageData " +
                "FROM Like l " +
                "JOIN AuroraUser au on l.user.userId = au.userId " +
                "JOIN ProfilePicture pfp ON l.user.userId = pfp.user.userId " +
                "WHERE l.gif.gifId = :gifId");
        query.setParameter("gifId", gifId);

        final List<Object[]> list = query.getResultList();
        return list;
    }

    public List<Object> getMostLikedGIFs() {
        Query query = entityManager.createQuery(
                "SELECT COUNT(l), u.username, g, pfp.imageData " +
                        "FROM Like l " +
                        "JOIN l.gif g " +
                        "JOIN g.user u " +
                        "JOIN ProfilePicture pfp " +
                        "ON pfp.user.userId = u.userId " +
                        "GROUP BY u.username, g, pfp.imageData " +
                        "ORDER BY COUNT(l) DESC"
        );
        final var list = query.getResultList();;
        if (list.isEmpty()) return null;
        return list;
    }

    public List<Object> getMostRecentGIFs() {
        Query query = entityManager.createQuery(
                "SELECT COUNT(*), u.username, g, pfp.imageData " +
                        "FROM AuroraGIF g " +
                        "JOIN g.user u " +
                        "JOIN ProfilePicture pfp ON pfp.user.userId = u.userId " +
                        "GROUP BY u.username, g.gifId, g.imageData, g.description, g.publishDate, g.user.userId, pfp.imageData " +
                        "ORDER BY g.publishDate DESC"
        );
        final var list = query.getResultList();
        if (list.isEmpty()) return null;
        return list;
    }
}
