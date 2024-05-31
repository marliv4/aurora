package com.livajusic.marko.aurora.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ValuesService {
    @Value("${upload.directory}")
    private String uploadDirectory;

    @Value("${upload.profilepictures.directory}")
    private String profilePicturesDirectory;

    public String getUploadDirectory() {
        return uploadDirectory;
    }

    public String getProfilePicturesDirectory() {
        return profilePicturesDirectory;
    }
}
