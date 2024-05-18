package com.livajusic.marko.aurora.controllers;

import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.AuroraUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/")
public class AppController {

    private final GifRepo gifRepo;

    @Autowired
    private final UserRepo userRepo;

    public AppController(GifRepo gifRepo,
                         UserRepo userRepo) {
        this.gifRepo = gifRepo;
        this.userRepo = userRepo;
    }

    @GetMapping(path = {"/", "/index"})
    public String index(Model model) {
        List<AuroraGIF> allGifs = gifRepo.findAll();
        List<Map<String, Object>> gifAttributes = new ArrayList<>();
        for (AuroraGIF gif : allGifs) {
            Map<String, Object> gifData = new HashMap<>();
            gifData.put("path", gif.getPath());
            gifData.put("author", gif.getUser().getUsername());
            gifData.put("date", gif.getPublishDate());
            gifData.put("license", gif.getLicence());
            gifAttributes.add(gifData);
        }
        model.addAttribute("gifs", gifAttributes);

        return "index";
    }


}
