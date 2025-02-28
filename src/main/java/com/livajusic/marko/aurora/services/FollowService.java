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

import com.livajusic.marko.aurora.tables.composite_keys.FollowId;
import com.livajusic.marko.aurora.db_repos.FollowRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.Follows;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FollowService {
    private final UserRepo userRepo;
    private final FollowRepo followRepo;

    private final EntityManager entityManager;
    @Autowired
    public FollowService(UserRepo userRepo,
                         FollowRepo followRepo,
                         EntityManager entityManager) {
        this.userRepo = userRepo;
        this.followRepo = followRepo;
        this.entityManager = entityManager;
    }

    @Transactional
    public void followUser(Long userId, Long followsUserId) {
        if (userId.equals(followsUserId)) {
            final var n = Notification.show("User can't follow himself.", 3000, Notification.Position.MIDDLE);
            n.addThemeVariants(NotificationVariant.LUMO_ERROR);
            return;
        }

        Optional<AuroraUser> user = userRepo.findById(userId);
        Optional<AuroraUser> followedUser = userRepo.findById(followsUserId);

        if (user.isPresent() && followedUser.isPresent()) {
            FollowId followId = new FollowId(userId, followsUserId);
            if (!followRepo.existsById(followId)) {
                Follows follow = new Follows(followId, user.get(), followedUser.get(), LocalDateTime.now());
                followRepo.save(follow);
                final var n = Notification.show("Followed user!", 1500, Notification.Position.MIDDLE);
                n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
            }
        } else {
            final var n = Notification.show("User not found.", 3000, Notification.Position.MIDDLE);
            n.addThemeVariants(NotificationVariant.LUMO_ERROR);
            return;
        }
    }

    @Transactional
    public void unfollowUser(Long userId, Long followsUserId) {
        FollowId followId = new FollowId(userId, followsUserId);
        if (followRepo.existsById(followId)) {
            followRepo.deleteById(followId);
            final var n = Notification.show("Unfollowed user!", 1500, Notification.Position.MIDDLE);
            n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        }
    }

    public boolean isFollowing(Long userId, Long followsUserId) {
        Query query = entityManager.createQuery("SELECT count(f) " +
                "FROM Follows f " +
                "WHERE f.user.userId = :userId " +
                "AND f.followsUser.userId = :followsUserId", Long.class);
        query.setParameter("userId", userId);
        query.setParameter("followsUserId", followsUserId);

        Long count = (Long) query.getSingleResult();
        return count > 0;
    }

    public Long getFollowersCount(Long userId) {
        Query query = entityManager.createQuery("SELECT COUNT(*) " +
                "FROM Follows" +
                " WHERE followsUser.userId = :user_id");
        query.setParameter("user_id", userId);
        return (Long)query.getSingleResult();
    }

    public Long getFollowingCount(Long userId) {
        Query query = entityManager.createQuery("SELECT COUNT(*) " +
                "FROM Follows " +
                "WHERE user.userId = :userId");
        query.setParameter("userId", userId);
        return (Long)query.getSingleResult();
    }

    public List<Object[]> getUsersFollowers(Long userId) {
        Query query = entityManager.createQuery(
                "SELECT au, pfp.imageData " +
                        "FROM AuroraUser au " +
                        "JOIN Follows f ON au.userId = f.user.userId " +
                        "JOIN ProfilePicture pfp ON au.userId = pfp.user.userId " +
                        "WHERE f.followsUser.userId = :userId"
        );

        query.setParameter("userId", userId);
        return query.getResultList();
    }

    public List<Object[]> getFollowingUsers(Long userId) {
        Query query = entityManager.createQuery(
                "SELECT au, pfp.imageData FROM AuroraUser au" +
                        " JOIN Follows f ON au.userId = f.followsUser.userId" +
                        " JOIN ProfilePicture pfp on au.userId = pfp.user.userId" +
                        " WHERE f.user.userId = :userId"
        );
        query.setParameter("userId", userId);
        return query.getResultList();
    }

    public List<Object[]> getGifsFromFollowingUsers(Long userId) {
        Query query = entityManager.createQuery(
                "SELECT ag, pfp.imageData " +
                        "FROM AuroraGIF ag" +
                        " JOIN ag.user au" +
                        " JOIN Follows f ON au.userId = f.followsUser.userId" +
                        " JOIN ProfilePicture pfp " +
                        " ON ag.user.userId = pfp.user.userId " +
                        " WHERE f.user.userId = :userId " +
                        " AND ag.gifId NOT IN (" +
                        "   SELECT v.id.gifId " +
                        "   FROM ViewedPost v " +
                        "   WHERE v.id.userId = :userId" +
                        " ) " +
                        " ORDER BY ag.publishDate DESC"
        );
        query.setParameter("userId", userId);

        List<Object[]> gifs = (List<Object[]>)query.getResultList();
        return gifs;
    }
}
