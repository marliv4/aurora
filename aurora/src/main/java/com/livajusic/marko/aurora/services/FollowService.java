package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.tables.composite_keys.FollowId;
import com.livajusic.marko.aurora.db_repos.FollowRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.Follows;
import com.vaadin.flow.component.notification.Notification;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
            Notification.show("User can't follow himself.", 3000, Notification.Position.MIDDLE);
            return;
        }

        Optional<AuroraUser> user = userRepo.findById(userId);
        Optional<AuroraUser> followedUser = userRepo.findById(followsUserId);

        if (user.isPresent() && followedUser.isPresent()) {
            FollowId followId = new FollowId(userId, followsUserId);
            if (!followRepo.existsById(followId)) {
                Follows follow = new Follows(followId, user.get(), followedUser.get(), LocalDateTime.now());
                followRepo.save(follow);
                Notification.show("Followed user!", 1500, Notification.Position.MIDDLE);
            }
        } else {
            Notification.show("User not found.", 3000, Notification.Position.MIDDLE);
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
        Query query = entityManager.createQuery("SELECT COUNT(*) FROM Follows WHERE followsUser.userId = :user_id");
        query.setParameter("user_id", userId);
        return (Long)query.getSingleResult();
    }

    public Long getFollowingCount(Long userId) {
        Query query = entityManager.createQuery("SELECT COUNT(*) FROM Follows WHERE user.userId = :userId");
        query.setParameter("userId", userId);
        return (Long)query.getSingleResult();
    }
}
