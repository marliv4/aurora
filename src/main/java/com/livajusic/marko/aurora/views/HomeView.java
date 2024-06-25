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
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import java.util.stream.Collectors;

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
    private final GIFService gifService;

    @Autowired
    UserService userService;

    private TextField searchField;
    private final ArrayList<Div> displayedGifs;
    private final LanguagesController languagesController;
    private ComboBox<String> selectCriteria;

    private static class Filtered {
        public static boolean filteredByCriteria = false;
        public static boolean filteredByCategory = false;
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
                    NotificationService notificationService,
                    GIFService gifService) {
        this.gifRepo = gifRepo;
        this.gifCategoryRepo = gifCategoryRepo;
        this.likeService = likeService;
        this.userService = userService;
        this.gifDisplayService = gifDisplayService;
        this.languagesController = languagesController;
        this.followService = followService;
        this.gifService = gifService;

        displayedGifs = new ArrayList<>();

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
        add(navbar);

        System.out.println(userService.getCurrentUsername());

        final var horizontalLayout = createHorizontalLayout();

        searchField.setPlaceholder(languagesController.get("filter_by_categories"));
        searchField.addValueChangeListener(event -> {
            if (!event.getValue().isEmpty()) {
                // Check if any criteria is selected.
                if (Filtered.filteredByCriteria) {
                    // Criteria: true, category: true
                    System.out.println("filtered by criteria already.");
                    // Get GIFS filtered through criteria.
                    final List<Object> list = getFiltered();
                    List<Long> gifIds = list.stream()
                            .map(obj -> ((AuroraGIF) ((Object[]) obj)[2]).getId())
                            .collect(Collectors.toList());

                    final var latest = gifService.filterGivenGifsByCategory(gifIds, Arrays.asList(searchField.getValue().split(",")));
                    if (latest != null && !latest.isEmpty()) {
                        clearCurrentlyDisplayedGIFs();
                        displayGifsFromArray(latest);
                        Filtered.filteredByCategory = true;
                        Filtered.filteredByCriteria = true;
                    }
                } else {
                    // Criteria: false, category: true
                    final var newGifs = gifService.filterGifsByCategory(event.getValue());
                    if (newGifs != null) {
                        clearCurrentlyDisplayedGIFs();
                        displayGifsFromArray(newGifs);
                        Filtered.filteredByCategory = true;
                        Filtered.filteredByCriteria = false;
                    }
                }
            } else {
                clearCurrentlyDisplayedGIFs();
                // Criteria: false, category: false
                displayGifsFromArray(gifService.getAllGifsWithPfp());
            }
        });

        // Display GIFS of following users.
        if (userService.isLoggedIn()) {
            System.out.println("displaying gifs from users one is following.");
            final var gifs = followService.getGifsFromFollowingUsers(userService.getCurrentUserId());
            displayGifsFromArray(gifs);
        }

        if (!Filtered.filteredByCriteria && !Filtered.filteredByCategory) {
            displayGifsFromArray(gifService.getAllGifsWithPfp());
        }
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
    }

    private void setLang(SettingsService settingsService) {
        final var userId = userService.getCurrentUserId();
        System.out.println("tester" + userId);
        String lang = settingsService.getUsersLanguage(userId);
        System.out.println(String.format("%s logged in, settings his language to %s", userId, lang));
        languagesController.switchLanguage(lang);
    }

    private HorizontalLayout createHorizontalLayout() {
        HorizontalLayout horizontalLayout = new HorizontalLayout();
        horizontalLayout.setWidthFull();
        horizontalLayout.setAlignItems(Alignment.BASELINE);
        horizontalLayout.setJustifyContentMode(JustifyContentMode.CENTER);

        createFilterCriteria();
        searchField = new TextField();
        horizontalLayout.add(selectCriteria, searchField);
        add(horizontalLayout);

        return horizontalLayout;
    }

    private void displayGifsFromArray(List<Object[]> gifsAndPfps) {
        final var list = gifDisplayService.createDivFromGifArray(gifsAndPfps);
        for (Div gifDiv : list) {
            add(gifDiv);
            displayedGifs.add(gifDiv);
        }
    }

    private void createFilterCriteria() {
        selectCriteria = new ComboBox<>(languagesController.get("select_criteria"));
        selectCriteria.setItems(languagesController.get("top_likes"), languagesController.get("recent"), languagesController.get("oldest"));
        selectCriteria.setValue(languagesController.get("oldest"));

        selectCriteria.addValueChangeListener(event -> {
            String selectedCriteria = event.getValue();
            clearCurrentlyDisplayedGIFs();
            displayBasedOnCriteria();
        });
    }

    private void clearCurrentlyDisplayedGIFs() {
        for (Div d : displayedGifs) {
            remove(d);
        }
        displayedGifs.clear();
    }

    private List<Object> getFiltered() {
        List<Object> list = new ArrayList<>();
        if (languagesController.get("top_likes").equals(selectCriteria.getValue())) {
            list = likeService.getMostLikedGIFs();
        } else if ("Recent".equals(selectCriteria.getValue())) {
            list = likeService.getMostRecentGIFs();
        } else {
            final var displayList = gifService.getAllGifsWithPfp();
            if (displayList != null) {
                displayGifsFromArray(gifService.getAllGifsWithPfp());
                Filtered.filteredByCriteria = false;
            }
        }

        return list;
    }

    private void displayBasedOnCriteria() {
        Filtered.filteredByCriteria = true;
        List<Object> list = getFiltered();

        if (!list.isEmpty()) {
            for (Object o : list) {
                Object[] row = (Object[]) o;
                final var username = (String) row[1];
                final var gif = (AuroraGIF) row[2];
                final byte[] pfpBytes = (byte[]) row[3];
                Div div = gifDisplayService.displaySingleGif(username, gif, pfpBytes);
                add(div);
                displayedGifs.add(div);
            }
        }
    }
}
