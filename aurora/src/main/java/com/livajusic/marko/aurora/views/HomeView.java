package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.GifCategoryRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.services.LikeService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.GifCategory;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.component.button.Button;
import com.livajusic.marko.aurora.tables.BelongsTo;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@PageTitle("Main")
@Route(value = "/")
@AnonymousAllowed
public class HomeView extends VerticalLayout {

    private final GifRepo gifRepo;

    private final GifCategoryRepo gifCategoryRepo;

    private final ValuesService valuesService;

    private final LikeService likeService;

    private final UserService userService;


    public HomeView(GifRepo gifRepo,
                    GifCategoryRepo gifCategoryRepo,
                    ValuesService valuesService,
                    LikeService likeService,
                    UserService userService) {
        this.gifRepo = gifRepo;
        this.gifCategoryRepo = gifCategoryRepo;
        this.valuesService = valuesService;
        this.likeService = likeService;
        this.userService = userService;

        NavigationBar navbar = new NavigationBar(valuesService, userService);
        add(navbar);

        TextField searchField = new TextField();
        searchField.setPlaceholder("Filter by categories");
        searchField.addValueChangeListener(event -> filterGifs(event.getValue()));
        add(searchField);

        displayAllGifs();

        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
    }

    private void filterGifs(String category) {
        System.out.println(category);

        ArrayList<String> categoriesList = new ArrayList<>();
        categoriesList.add(category);
        if (category.contains(",")) {
            categoriesList.addAll(Arrays.asList(category.split(",")));
        }

        for (String c : categoriesList) {
            final Optional<GifCategory> categoryOptional = gifCategoryRepo.findByCategory(c);
            final var empty = categoryOptional.isEmpty();
            if (empty) {
                return;
            }

            final var gifCategory = categoryOptional.get();
            final Set<BelongsTo> gifSet = gifCategory.getGifs();

            for (BelongsTo b : gifSet) {
                System.out.println(b.toString());
            }
        }
    }

    private void displayAllGifs() {
        // Get all GIFs
        List<AuroraGIF> allGifs = gifRepo.findAll();
        for (AuroraGIF gif : allGifs) {
            final var file = gif.getPath();

            final var basePath = valuesService.getUploadDirectory();
            System.out.println("basePath: " + basePath);

            final var user = gif.getUser();
            final var username = user.getUsername();

            String out = "/images/" + username + "/" + file;
            System.out.println("OUT:" + out);
            System.out.println("FILE:" + file);

            StreamResource resource = new StreamResource(file,
                    () -> getClass().getResourceAsStream(out));

            System.out.println("RESOURCE: " + resource);
            Image image = new Image(resource, "GIF");

            Div gifDiv = new Div();
            gifDiv.addClassName("gif-container");

            Span usernameLabel = new Span("Username: " + username);
            Span likesLabel = new Span("Likes: " + gif.getPath());


            Button likeUnlikeButton = new Button("Like");
            boolean likedAlready = false;

            likeUnlikeButton.addClickListener(buttonClickEvent -> {
                // TODO: if user logged in
                    likeService.likeGif(user.getId(), gif.getId());
                Notification.show("Liked!", 3000, Notification.Position.MIDDLE);
            });

            Span amountLikes = new Span("Amount likes: ");

            VerticalLayout gifLayout = new VerticalLayout(usernameLabel, image, likesLabel, likeUnlikeButton, amountLikes);
            gifLayout.setDefaultHorizontalComponentAlignment(Alignment.CENTER);
            gifLayout.getStyle().set("border", "1px solid #ccc")
                    .set("padding", "10px")
                    .set("border-radius", "10px")
                    .set("margin", "10px")
                    .set("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.1)");

            gifDiv.add(gifLayout);

            add(gifDiv);
        }

    }

}
