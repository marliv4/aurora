package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.tables.AuroraGIF;
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
import org.aspectj.weaver.ast.Not;
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
        followRepo.deleteById(followId);
    }

    public boolean isFollowing(Long userId, Long followsUserId) {
        FollowId followId = new FollowId(userId, followsUserId);
        return followRepo.existsById(followId);
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
                "SELECT au.username, pfp.imageData " +
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
                "SELECT au.username, pfp.imageData FROM AuroraUser au" +
                        " JOIN Follows f ON au.userId = f.followsUser.userId" +
                        " JOIN ProfilePicture pfp on au.userId = pfp.user.userId" +
                        " WHERE f.user.userId = :userId"
        );
        query.setParameter("userId", userId);
        return query.getResultList();
    }

    public List<AuroraGIF> getGifsFromFollowingUsers(Long userId) {
        Query query = entityManager.createQuery(
                "SELECT ag FROM AuroraGIF ag" +
                        " JOIN ag.user au" +
                        " JOIN Follows f ON au.userId = f.followsUser.userId" +
                        " WHERE f.user.userId = :userId"
        );
        query.setParameter("userId", userId);

        List<AuroraGIF> gifs = query.getResultList();
        for (AuroraGIF gif : gifs) {
            System.out.println(gif);
        }

        return gifs;
    }
}
