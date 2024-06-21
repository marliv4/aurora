/*
 * This file is part of Aurora.
 *
 * Aurora is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Aurora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Aurora. If not, see <https://www.gnu.org/licenses/>.
 *
 * Author: Marko Livajusic
 * Email: marko.livajusic4 <at> gmail.com
 * Copyright: (C) 2024 Marko Livajusic
 */
package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.db_repos.GifCategoryRepo;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.services.*;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.GifCategory;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.virtuallist.VirtualList;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.livajusic.marko.aurora.tables.BelongsTo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@PageTitle("Main")
@Route(value = "/")
@AnonymousAllowed
// @CssImport("./styles.css")
public class HomeView extends VerticalLayout {

    private final GifRepo gifRepo;
    private final GifCategoryRepo gifCategoryRepo;
    private final LikeService likeService;
    private final GIFDisplayService gifDisplayService;
    private final FollowService followService;

    @Autowired
    UserService userService;

    private TextField searchField;
    private ArrayList<Div> displayedGifs;
    private final LanguagesController languagesController;

    private static class Filtered {
        public static boolean filtered = false;
    }

    public HomeView(GifRepo gifRepo,
                    GifCategoryRepo gifCategoryRepo,
                    LikeService likeService,
                    UserService userService,
                    GIFDisplayService gifDisplayService,
                    ProfilePictureService profilePictureService,
                    LanguagesController languagesController,
                    SettingsService settingsService,
                    FollowService followService,
                    NotificationService notificationService) {
        this.gifRepo = gifRepo;
        this.gifCategoryRepo = gifCategoryRepo;
        this.likeService = likeService;
        this.userService = userService;
        this.gifDisplayService = gifDisplayService;
        this.languagesController = languagesController;
        this.followService = followService;

        displayedGifs = new ArrayList<>();

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
        add(navbar);

        System.out.println(userService.getCurrentUsername());

        final var horizontalLayout = createHorizontalLayout();

        searchField.setPlaceholder(languagesController.get("filter_by_categories"));
        searchField.addValueChangeListener(event -> {
            filterGifs(event.getValue());
            Filtered.filtered = true;
        });
        // add(searchField);

        // Display GIFS of following users.
        if (userService.isLoggedIn()) {
            System.out.println("displaying gifs from users one is following.");
            final var gifs = followService.getGifsFromFollowingUsers(userService.getCurrentUserId());
            displayGifsFromArray(gifs);
        }

        if (!Filtered.filtered) {
            displayGifsFromArray(gifRepo.findAll());
        }
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        // getElement().getStyle().set("background-color", "#0D1219");
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

    private void displayGifsFromArray(List<AuroraGIF> gifs) {
        final var list = gifDisplayService.createDivFromGifArray(gifs);
        VirtualList<Div> vl = new VirtualList<>();
        vl.setItems(list);


        for (Div gifDiv : list) {
            add(gifDiv);
            displayedGifs.add(gifDiv);
        }

    }

    private ComboBox<String> createFilterCriteria() {
        ComboBox<String> selectCriteria = new ComboBox<>(languagesController.get("selectcriteria"));
        selectCriteria.setItems(languagesController.get("toplikes"), languagesController.get("recent"));

        selectCriteria.addValueChangeListener(event -> {
            String selectedCriteria = event.getValue();
            clearCurrentlyDisplayedGIFs();
            Filtered.filtered = true;
            if ("Top Likes".equals(selectedCriteria)) {
                // Clear all currently displayed GIFs
                final var mostLikedGIFs = likeService.getMostLikedGIFs();
                for (Object o : mostLikedGIFs) {
                    Object[] row = (Object[])o;
                    final var amountLikes = (Long)row[0];
                    final var username = (String)row[1];
                    final var gif = (AuroraGIF) row[2];

                    System.out.println("amount likes: " + amountLikes + "; path: " + " a: " + row[2] + " b: " + row[3]);
                    add(gifDisplayService.displaySingleGif(username, gif));
                }
            } else if ("Recent".equals(selectedCriteria)) {
                final var mostRecentGIFs = likeService.getMostRecentGIFs();
                for (Object o : mostRecentGIFs) {
                    Object[] row = (Object[]) o;
                    final var username = (String) row[0];
                    final var gif = (AuroraGIF) row[1];
                    add(gifDisplayService.displaySingleGif(username, gif));
                }
            }
        });

        // add(selectCriteria);
        return selectCriteria;
    }

    private void clearCurrentlyDisplayedGIFs() {
        for (Div d : displayedGifs) {
            remove(d);
        }
        displayedGifs.clear();
    }
}
