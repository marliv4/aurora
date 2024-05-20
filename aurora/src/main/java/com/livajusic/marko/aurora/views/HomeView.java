package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.VaadinService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import org.apache.catalina.webresources.FileResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.util.List;

@PageTitle("Main")
@Route(value = "/")
@AnonymousAllowed
public class HomeView extends HorizontalLayout {

    private final GifRepo gifRepo;

    @Value("${upload.directory}")
    private String basePath;

    public HomeView(GifRepo gifRepo) {
        this.gifRepo = gifRepo;

        NavigationBar navbar = new NavigationBar();
        add(navbar);

        // Get all GIFs
        // This should be optimized once there are hundreds/thousands of GIFS
        // in the DB.
        List<AuroraGIF> allGifs = gifRepo.findAll();

        for (AuroraGIF gif : allGifs) {
            final var file = gif.getPath();
            String out = "/images/" + gif.getUser().getUsername() + "/" + file;
            System.out.println("OUT:" + out);

            add(new Image(new StreamResource(file,
                    () -> getClass().getResourceAsStream(out)),
                    "GIF"
            ));

        }
    }

}
