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
package com.livajusic.marko.aurora;

import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.services.FollowService;
import com.livajusic.marko.aurora.services.SettingsService;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.tables.Settings;
import com.livajusic.marko.aurora.views.dialogs.FollowersDialog;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;

public class UserInfoDisplayUtils {
    private Span followersSpan;

    private HorizontalLayout infoLayout;

    private final GifRepo gifRepo;

    private final UserService userService;
    private final SettingsService settingsService;

    public UserInfoDisplayUtils(GifRepo gifRepo,
                                Long userId,
                                UserService userService,
                                FollowService followService,
                                SettingsService settingsService) {
        this.gifRepo = gifRepo;
        this.userService = userService;
        this.settingsService = settingsService;
        createUserInfoLayout(userId, followService);
    }

    private void createUserInfoLayout(Long userId,
                                      FollowService followService) {
        infoLayout = new HorizontalLayout();
        followersSpan = new Span("Followers: " + followService.getFollowersCount(userId));
        infoLayout.add(followersSpan);

        followersSpan.addClickListener(l -> {
            if (userService.getCurrentUserId().equals(userId) || settingsService.canOthersSeeFollowers(userId)) {
                System.out.println("who are his followers?");
                FollowersDialog fd = new FollowersDialog(followService, userService);
                fd.openDialog(userId, FollowersDialog.DialogType.DIALOG_SHOW_USERS_FOLLOWERS);
            }
        });

        Span followingSpan = new Span("Following: " + followService.getFollowingCount(userId));
        followingSpan.addClickListener(l -> {
            if (settingsService.canOthersSeeFollowing(userId)) {
                System.out.println("who is he following?");
                FollowersDialog fd = new FollowersDialog(followService, userService);
                fd.openDialog(userId, FollowersDialog.DialogType.DIALOG_SHOW_FOLLOWING_USERS);
            }
        });
        infoLayout.add(followingSpan);
        Span postsCountSpan = new Span("Posts: " + gifRepo.countByUserId(userId));
        infoLayout.add(postsCountSpan);
    }

    public Span getFollowersSpan() {
        return followersSpan;
    }

    public HorizontalLayout getInfoLayout() {
        return infoLayout;
    }
}
