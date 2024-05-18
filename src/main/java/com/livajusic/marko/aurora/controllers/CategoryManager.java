package com.livajusic.marko.aurora.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CategoryManager {
    @GetMapping("/category_manager")
    public String manageCategories() {
        return "category_manager";
    }
}
