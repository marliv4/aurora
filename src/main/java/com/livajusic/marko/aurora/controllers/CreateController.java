package com.livajusic.marko.aurora.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CreateController {

    @GetMapping("/create")
    public String create() {
        return "create";

    }
}
