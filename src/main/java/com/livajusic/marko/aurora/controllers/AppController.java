package com.livajusic.marko.aurora.controllers;

import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/")
public class AppController {

    private final GifRepo gifRepo;

    public AppController(GifRepo gifRepo) {
        this.gifRepo = gifRepo;
    }

    @GetMapping(path = {"/", "/index"})
    public String index(Model model) {
        List<AuroraGIF> allGifs = gifRepo.findAll();
        List<String> paths = allGifs.stream().map(AuroraGIF::getPath).collect(Collectors.toList());

        for (String path : paths) {
            System.out.println(path);
        }

        model.addAttribute("gifPaths", paths);

        return "index";
    }


}
