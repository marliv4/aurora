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

import com.livajusic.marko.aurora.tables.GifCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Query;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;


@Service
public class FileService {
    private final EntityManager entityManager;

    public FileService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public File createDirIfNeeded(String path) {
        File dir = new File(path);
        if (!dir.exists()) {
            System.out.println("/"  + path + " folder not existing, creating it...");
            if (dir.mkdirs()) {
                System.out.println("Created /" + path + "/ successfully.");
            }
        }

        return dir;
    }

    private byte[] readBytesFromInputStream(InputStream is) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();

        int nRead;
        byte[] data = new byte[1024];

        while ((nRead = is.read(data, 0, data.length)) != -1) {
            buffer.write(data, 0, nRead);
        }

        buffer.flush();
        return buffer.toByteArray();
    }

    public byte[] getDataBytes(InputStream is) {
        byte[] imageData = {};
        try {
            imageData = readBytesFromInputStream(is);
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
        return imageData;
    }

    public boolean categoryAlreadyExists(String category) {
        Query query = entityManager.createQuery("SELECT count(c) " +
                "FROM GifCategory c " +
                "WHERE c.category = :category", Long.class);

        query.setParameter("category", category);
        Long count = (Long) query.getSingleResult();
        System.out.println("Count: " + count);

        return count > 0;
    }

    public GifCategory getCategory(String category) {
        Query query = entityManager.createQuery("SELECT gc " +
                "FROM GifCategory gc " +
                "WHERE gc.category = :category");
        query.setParameter("category", category);
        return (GifCategory)query.getSingleResult();
    }
}
