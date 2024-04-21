package com.livajusic.marko.aurora.controllers;

import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.IOException;
import org.springframework.http.ResponseEntity;

@Controller
@RequestMapping("/publish")
public class PublishController {
    private final GifRepo gifRepo;

    @Autowired
    private final UserRepo userRepo;

    @Autowired
    UserService userService;

    @Value("${upload.directory}")
    private String imgDir;

    public PublishController(GifRepo gifRepo, UserRepo userRepo) {
        this.gifRepo = gifRepo;
        this.userRepo = userRepo;
    }

    @GetMapping
    public String publish(Model model) {
        return "publish";

    }

    @PostMapping
    public String publishHandler(
            @RequestParam("file") MultipartFile file,
            @RequestParam("license") String license,
            Model model) {

        System.out.println("LICENSE: " + license);

        if (file.isEmpty()) {
            System.out.println("ERROR");
            return "redirect:/publish?error";
            // return new ResponseEntity<>("No file uploaded!", HttpStatus.BAD_REQUEST);
        }

        try {
            File dir = new File(imgDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }


            final var uname = userService.getCurrentUsername();
            final var suchUserExists = userRepo.findByUsername(uname).isPresent();
            if (!suchUserExists) {
                return "redirect:/publish?error";
                // return new ResponseEntity<>("Couldn't find the user!", HttpStatus.BAD_REQUEST);
            }

            final var currentUser = userRepo.findByUsername(uname).get();

            var filename = currentUser.getId() + "_" + uname + "_" + file.getOriginalFilename();
            System.out.println("image path: " + filename);

            File f = new File(dir, filename);
            file.transferTo(f);

            // model.addAttribute("imagePath", filename);

            AuroraGIF gif = new AuroraGIF(filename, currentUser, getDate(), license);
            gifRepo.save(gif);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // return new ResponseEntity("Success!", HttpStatus.OK);
        return "redirect:/publish?success";//?success=true";
    }


    private java.sql.Date getDate() {
        java.util.Date utilDate = new java.util.Date();
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

        System.out.println("utilDate:" + utilDate);
        System.out.println("sqlDate:" + sqlDate);

        return sqlDate;
    }
}
