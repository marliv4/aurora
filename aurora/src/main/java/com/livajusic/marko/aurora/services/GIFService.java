package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.sql.PreparedStatement;

@Service
public class GIFService {
    private final GifRepo gifRepo;
    private final EntityManager entityManager;

    public GIFService(GifRepo gifRepo,
                      EntityManager entityManager) {
        this.gifRepo = gifRepo;
        this.entityManager = entityManager;
    }

    public void insert(AuroraGIF gif, String filename) {

    }
}
