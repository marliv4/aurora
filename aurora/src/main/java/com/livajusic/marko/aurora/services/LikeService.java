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
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        System.out.println(user.getUsername() + " " + gif.getPath());
        Like like = new Like(user, gif);
        likeRepository.save(like);
    }

    @Transactional
    public void unlikeGif(Long userId, Long gifId) {
        Like like = likeRepository.findByUserIdAndGifId(userId, gifId);
        likeRepository.delete(like);
    }

    public Long getAmountOfLikes(Long gifId) {
        var query = entityManager.createQuery("SELECT COUNT(l.user.id) FROM Like l WHERE l.gif.id = :gifId", Long.class);
        query.setParameter("gifId", gifId);
        return (Long) query.getSingleResult();
    }

    public boolean hasUserAlreadyLikedGIF(Long userId, Long gifId) {
        final var query = entityManager.createQuery("SELECT COUNT(1) FROM Like l WHERE l.user.userId = :userId AND l.gif.gifId = :gifId");
        query.setParameter("userId", userId);
        query.setParameter("gifId", gifId);

        return (Long)query.getSingleResult() > 0;
    }
}
