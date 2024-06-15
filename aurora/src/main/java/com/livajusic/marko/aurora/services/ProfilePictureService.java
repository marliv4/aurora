package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.db_repos.ProfilePictureRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.ProfilePicture;
import com.vaadin.flow.component.html.Input;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@Service
public class ProfilePictureService {
    private final ProfilePictureRepo profilePictureRepo;
    private final UserRepo userRepo;
    private final FileService fileService;

    @Autowired
    public ProfilePictureService(ProfilePictureRepo profilePictureRepo,
                                 UserRepo userRepo,
                                 FileService fileService) {
        this.profilePictureRepo = profilePictureRepo;
        this.userRepo = userRepo;
        this.fileService = fileService;
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

    public byte[] getDefaultPfpBytes() {
        int width = 100;
        int height = 100;
        byte[] imageData = new byte[width * height * 3];

        for (int i = 0; i < imageData.length; i += 3) {
            imageData[i] = (byte)255;
            imageData[i + 1] = (byte)255;
            imageData[i + 2] = (byte)255;
        }

        return imageData;
    }

    public InputStream getDefaultPfpAsInputStream() {
        byte[] imageData = getDefaultPfpBytes();
        return new ByteArrayInputStream(imageData);
    }

    public Optional<ProfilePicture> getPfpByUserId(Long userId) {
        return profilePictureRepo.findByUserId(userId);
    }

    public boolean userHasPfp(Long userId) {
        long count = profilePictureRepo.countByUserUserId(userId);
        return count > 0;
    }
}
