package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.db_repos.CommentRepo;
import com.livajusic.marko.aurora.db_repos.GifCategoryRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.services.*;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.GifCategory;
import com.livajusic.marko.aurora.views.dialogs.CommentsDialog;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.flow.component.button.Button;
import com.livajusic.marko.aurora.tables.BelongsTo;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;
import com.vaadin.flow.theme.material.Material;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@PageTitle("Main")
@Route(value = "/")
@AnonymousAllowed
// @CssImport("./styles.css")
public class HomeView extends VerticalLayout {

    private final GifRepo gifRepo;

    private final GifCategoryRepo gifCategoryRepo;

    private final ValuesService valuesService;

    private final LikeService likeService;

    private final GIFDisplayService gifDisplayService;

    @Autowired
    UserService userService;

    private TextField searchField;

    private ArrayList<Div> displayedGifs;

    private static class Filtered {
        public static boolean filtered = false;
    }

    public HomeView(GifRepo gifRepo,
                    GifCategoryRepo gifCategoryRepo,
                    CommentRepo commentRepo,
                    CommentService commentService,
                    ValuesService valuesService,
                    LikeService likeService,
                    UserService userService,
                    GIFDisplayService gifDisplayService,
                    ProfilePictureService profilePictureService,
                    LanguagesController languagesController) {
        this.gifRepo = gifRepo;
        this.gifCategoryRepo = gifCategoryRepo;
        this.valuesService = valuesService;
        this.likeService = likeService;
        this.userService = userService;
        this.gifDisplayService = gifDisplayService;

        displayedGifs = new ArrayList<>();

        NavigationBar navbar = new NavigationBar(valuesService, userService, profilePictureService, languagesController);
        add(navbar);

        System.out.println(userService.getCurrentUsername());

        final var horizontalLayout = createHorizontalLayout();

        searchField.setPlaceholder("Filter by categories");
        searchField.addValueChangeListener(event -> {
            filterGifs(event.getValue());
            Filtered.filtered = true;
        });
        // add(searchField);

        if (!Filtered.filtered) {
            displayAllGifs();
        }
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        getElement().getStyle().set("background-color", "#0D1219");
    }

    private HorizontalLayout createHorizontalLayout() {
        HorizontalLayout horizontalLayout = new HorizontalLayout();
        horizontalLayout.setWidthFull();
        horizontalLayout.setAlignItems(Alignment.BASELINE);
        horizontalLayout.setJustifyContentMode(JustifyContentMode.CENTER);

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

    private void displayAllGifs() {
        // Get all GIFs
        List<AuroraGIF> allGifs = gifRepo.findAll();
        for (AuroraGIF gif : allGifs) {
            final var basePath = valuesService.getUploadDirectory();
            final var user = gif.getUser();
            final var username = user.getUsername();

            Div gifDiv = gifDisplayService.displaySingleGif(username, gif);
            add(gifDiv);
            displayedGifs.add(gifDiv);
        }

    }

    private ComboBox<String> createFilterCriteria() {
        ComboBox<String> selectCriteria = new ComboBox<>("Select Criteria");
        selectCriteria.getStyle()
                        .set("color", "white");
        selectCriteria.setItems("Top Likes", "Recent");

        selectCriteria.addValueChangeListener(event -> {
            String selectedCriteria = event.getValue();
            clearCurrentlyDisplayedGIFs();
            Filtered.filtered = true;
            if ("Top Likes".equals(selectedCriteria)) {
                System.out.println("TOP LIKES FILTER");
                // Clear all currently displayed GIFs
                final var mostLikedGIFs = likeService.getMostLikedGIFs();
                for (Object o : mostLikedGIFs) {
                    Object[] row = (Object[])o;
                    final var amountLikes = (Long)row[0];
                    final var userId = row[2];
                    final var username = (String)row[3];
                    final var gif = (AuroraGIF) row[4];

                    System.out.println("amount likes: " + amountLikes + "; path: " + " a: " + row[2] + " b: " + row[3]);
                    add(gifDisplayService.displaySingleGif(username, gif));
                }
            } else if ("Recent".equals(selectedCriteria)) {
                final var mostRecentGIFs = likeService.getMostRecentGIFs();
                for (Object o : mostRecentGIFs) {
                    Object[] row = (Object[]) o;
                    final var username = (String) row[1];
                    final var gif = (AuroraGIF) row[2];
                    add(gifDisplayService.displaySingleGif(username, gif));
                }
            }
        });

        // add(selectCriteria);
        return selectCriteria;
    }

    public void clearDisplayedGIF(Div d) {
        remove(d);
    }

    private void clearCurrentlyDisplayedGIFs() {
        for (Div d : displayedGifs) {
            remove(d);
        }
        displayedGifs.clear();
    }
}
