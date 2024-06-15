package com.livajusic.marko.aurora.services;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;


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
}
