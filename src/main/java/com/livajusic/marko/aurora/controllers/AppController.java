package com.livajusic.marko.aurora.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/")
public class AppController {
    @GetMapping(path = {"/", "/index", "/index.html"})
    public String index(Model model) {
        model.addAttribute("username", "marko");
        model.addAttribute("loggedIn", true);
        model.addAttribute("notLoggedIn", true);
        return "index";
    }


}
