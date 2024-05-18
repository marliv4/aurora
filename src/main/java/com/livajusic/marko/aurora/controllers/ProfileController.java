package com.livajusic.marko.aurora.controllers;

import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class ProfileController {

    @Autowired
    UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/profile")
    public String profile(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        final String username = auth.getName();
        final String pw = userService.getPassword(username);
        final String email = userService.getEmail(username);

        model.addAttribute("username", username);
        model.addAttribute("email", email);
        model.addAttribute("password", pw);
        return "profile";
    }

    @PostMapping("/change_password")
    public ResponseEntity changePassword(@RequestParam("c_password") String password) {

        final var uname = userService.getCurrentUsername();
        System.out.println(uname + " " + password);

        userService.updatePassword(uname, passwordEncoder.encode(password));

        return new ResponseEntity("Success!", HttpStatus.OK);
        // return "profile?";
    }

    @PostMapping("/change_pfp")
    public ResponseEntity changeProfilePicture(
            @RequestParam("file_pfp") MultipartFile file
    ) {
        return new ResponseEntity("Success!", HttpStatus.OK);
    }
}
