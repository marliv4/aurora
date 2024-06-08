package com.livajusic.marko.aurora.services;

import org.springframework.stereotype.Service;

import java.io.File;


@Service
public class FileService {

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
}
