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
