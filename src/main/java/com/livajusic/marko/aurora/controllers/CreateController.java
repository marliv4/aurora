package com.livajusic.marko.aurora.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CreateController {

    @GetMapping(path = {"/create", "/create.html"})
    public String create() {
        return "create";
    }
}
