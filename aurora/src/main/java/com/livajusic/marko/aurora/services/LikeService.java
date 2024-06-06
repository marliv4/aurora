package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.LikeRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.Like;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class LikeService {

    private final UserRepo userRepository;
    private final GifRepo gifRepository;
    private final LikeRepo likeRepository;

    @Autowired
    public LikeService(UserRepo userRepo, GifRepo gifRepo, LikeRepo likeRepo) {
        this.userRepository = userRepo;
        this.gifRepository = gifRepo;
        this.likeRepository = likeRepo;
    }

    @Transactional
    public void likeGif(Long userId, Long gifId) {
        System.out.println("likeGif");
        // TODO: Check if user has already liked the GIF.
        // SELECT * FROM Likes WHERE user_id = user_id AND gifId = :gifId
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
}
