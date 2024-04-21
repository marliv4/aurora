package com.livajusic.marko.aurora.controllers;

import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProfileController {

    @Autowired
    UserService userService;

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
    public String changePassword(@RequestParam("password") String password) {
        final var uname = userService.getCurrentUsername();
        userService.updatePassword(uname, password);

        return "profile?success";
    }
}
