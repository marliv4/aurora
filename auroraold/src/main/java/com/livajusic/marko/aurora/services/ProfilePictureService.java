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

import com.livajusic.marko.aurora.db_repos.ProfilePictureRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.ProfilePicture;
import com.vaadin.flow.component.html.Input;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class ProfilePictureService {
    private final ProfilePictureRepo profilePictureRepo;
    private final UserRepo userRepo;
    private final FileService fileService;
    private final EntityManager entityManager;

    @Autowired
    public ProfilePictureService(ProfilePictureRepo profilePictureRepo,
                                 UserRepo userRepo,
                                 FileService fileService,
                                 EntityManager entityManager) {
        this.profilePictureRepo = profilePictureRepo;
        this.userRepo = userRepo;
        this.fileService = fileService;
        this.entityManager = entityManager;
    }

    public void savePfp(InputStream is, AuroraUser user) throws IOException {
        Optional<ProfilePicture> pfpOptional = profilePictureRepo.findByUserId(user.getId());
        byte[] imageData = fileService.getDataBytes(is);
        if (pfpOptional.isPresent()) {
            final var pfp = pfpOptional.get();
            pfp.setImageData(imageData);
            profilePictureRepo.save(pfp);
        } else {
            ProfilePicture pfp = new ProfilePicture(imageData, user);
            profilePictureRepo.save(pfp);
        }
    }

    public InputStream getDefaultPfpAsInputStream() {
        byte[] imageData = getDefaultPfpBytes();
        return new ByteArrayInputStream(imageData);
    }

    public byte[] getDefaultPfpBytes() {
        byte[] fileContent = null;
        try (InputStream inputStream = getClass().getResourceAsStream("/static/default.png")) {
            if (inputStream != null) {
                fileContent = inputStream.readAllBytes();
            } else {
                throw new IOException("File not found: /static/default.png");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileContent;
    }

    public Optional<ProfilePicture> getPfpByUserId(Long userId) {
        return profilePictureRepo.findByUserId(userId);
    }

    public boolean userHasPfp(Long userId) {
        long count = profilePictureRepo.countByUserUserId(userId);
        return count > 0;
    }
}
