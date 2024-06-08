package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.db_repos.GifCategoryRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.services.LikeService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.services.ValuesService;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.GifCategory;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.component.button.Button;
import com.livajusic.marko.aurora.tables.BelongsTo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@PageTitle("Main")
@Route(value = "/")
@AnonymousAllowed
public class HomeView extends VerticalLayout {

    private final GifRepo gifRepo;

    private final GifCategoryRepo gifCategoryRepo;

    private final ValuesService valuesService;

    private final LikeService likeService;

    @Autowired
    UserService userService;

    private TextField searchField;


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

        System.out.println(userService.getCurrentUsername());

        final var horizontalLayout = createHorizontalLayout();
        var o = new Object(){ boolean filtered = false; };

        searchField.setPlaceholder("Filter by categories");
        searchField.addValueChangeListener(event -> {
            filterGifs(event.getValue());
            o.filtered = true;
        });
        // add(searchField);

        if (!o.filtered) {
            displayAllGifs();
        }
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
    }

    private HorizontalLayout createHorizontalLayout() {
        HorizontalLayout horizontalLayout = new HorizontalLayout();
        final var sort = createFilterCriteria();
        searchField = new TextField();
        horizontalLayout.add(sort, searchField);
        add(horizontalLayout);

        return horizontalLayout;
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
                System.out.println("FILTERED GIF FILENAME: " + b.toString());
            }
        }
    }

    private Div displaySingleGif(
                                 String filename,
                                 String path,
                                 String username,
                                 AuroraGIF gif) {
        StreamResource resource = new StreamResource(filename,
                () -> getClass().getResourceAsStream(path));

        System.out.println("RESOURCE: " + resource);
        Image image = new Image(resource, "GIF");

        Div gifDiv = new Div();
        gifDiv.addClassName("gif-container");

        Span usernameLabel = new Span("By: " + username);

        // Span amountLikes = new Span("Liked by");
        Button likeUnlikeButton = new Button("Like");
        boolean likedAlready = false;

        final var gifId = gif.getId();
        Span amountLikes = new Span("Liked by " + likeService.getAmountOfLikes(gifId) + " people");
        updateLikeUnlikeBtnState(likeUnlikeButton, gifId);
        likeUnlikeButton.addClickListener(buttonClickEvent -> {
            if (userService.isLoggedIn()) {
                final var currentUsername = userService.getCurrentUsername();
                final var currentUserId = userService.getUserIdByUsername(currentUsername);

                if (likeService.hasUserAlreadyLikedGIF(currentUserId, gifId)) {
                    likeService.unlikeGif(currentUserId, gifId);
                    likeUnlikeButton.setText("Like");
                    Notification.show("Unliked!", 500, Notification.Position.BOTTOM_CENTER);

                    updateAmountLikesSpan(likeService, gifId, amountLikes);
                } else {
                    likeService.likeGif(currentUserId, gifId);
                    likeUnlikeButton.setText("Unlike");
                    Notification.show("Liked!", 500, Notification.Position.BOTTOM_CENTER);

                    updateAmountLikesSpan(likeService, gifId, amountLikes);
                }
            } else {
                Notification.show("Please log in to like posts.", 500, Notification.Position.BOTTOM_CENTER);
            }
        });

        VerticalLayout gifLayout = new VerticalLayout(usernameLabel, image, likeUnlikeButton, amountLikes);
        gifLayout.setDefaultHorizontalComponentAlignment(Alignment.CENTER);
        gifLayout.getStyle().set("border", "1px solid #ccc")
                .set("padding", "10px")
                .set("border-radius", "10px")
                .set("margin", "10px")
                .set("box-shadow", "0 4px 8px rgba(0, 0, 0, 0.1)");
        gifDiv.add(gifLayout);

        add(gifDiv);

        return gifDiv;
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

            Div gifDiv = displaySingleGif(file, out, username, gif);
        }

    }

    private void updateLikeUnlikeBtnState(Button likeUnlikeButton, Long gifId) {
        if (userService.isLoggedIn()) {
            final var currentUsername = userService.getCurrentUsername();
            final var currentUserId = userService.getUserIdByUsername(currentUsername);

            if (likeService.hasUserAlreadyLikedGIF(currentUserId, gifId)) {
                likeUnlikeButton.setText("Unlike");
            } else {
                likeUnlikeButton.setText("Like");
            }
        } else {
            likeUnlikeButton.setText("Like");
        }
    }

    private void updateAmountLikesSpan(LikeService likeService,
                                       Long gifId,
                                       Span amountLikes) {
        Long currentAmountLikes = likeService.getAmountOfLikes(gifId);
        amountLikes.setText("Liked by " + String.valueOf(currentAmountLikes) + " people");
    }

    private ComboBox<String> createFilterCriteria() {
        ComboBox<String> selectCriteria = new ComboBox<>("Select Criteria");
        selectCriteria.setItems("Top Likes", "Recent"); // Add options

        // Handle selection changes
        selectCriteria.addValueChangeListener(event -> {
            String selectedCriteria = event.getValue();
            if ("Top Likes".equals(selectedCriteria)) {
                // TODO.
            } else if ("Recent".equals(selectedCriteria)) {
                // TODO.
            }
        });

        // add(selectCriteria);
        return selectCriteria;
    }
}
