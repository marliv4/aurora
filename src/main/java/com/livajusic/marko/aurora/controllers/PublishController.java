package com.livajusic.marko.aurora.controllers;

import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import com.livajusic.marko.aurora.SecurityConfig;

import java.io.File;
import java.io.IOException;
import org.springframework.http.ResponseEntity;

@Controller
@RequestMapping(value = {"/publish"})
public class PublishController {
    private final GifRepo gifRepo;

    @Value("${upload.directory}")
    private String imgDir;

    public PublishController(GifRepo gifRepo) {
        this.gifRepo = gifRepo;
    }

    @GetMapping
    public String publish() {
        return "publish";
    }

    @PostMapping
    public String publishHandler(
            @RequestParam("file") MultipartFile file,
            @RequestParam("license") String license,
            Model model) {

        System.out.println("LICENSE: " + license);

        if (file.isEmpty()) {
            return "";
            // new ResponseEntity<>("Fail!", HttpStatus.BAD_REQUEST);
        }

        try {
            File dir = new File(imgDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            final var filename = file.getOriginalFilename();
            System.out.println("imagePath: " + filename);

            File f = new File(dir, filename);
            file.transferTo(f);

            System.out.println(f.getPath());
            model.addAttribute("imagePath", filename);

            // final var user = SecurityConfig.getUser();
            AuroraGIF gif = new AuroraGIF(filename, null, getDate(), license);
            gifRepo.save(gif);

        } catch (IOException e) {
                e.printStackTrace();
            }

        return "redirect:/publish?success";
    }


    private java.sql.Date getDate() {
        java.util.Date utilDate = new java.util.Date();
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

        System.out.println("utilDate:" + utilDate);
        System.out.println("sqlDate:" + sqlDate);

        return sqlDate;
    }
}
