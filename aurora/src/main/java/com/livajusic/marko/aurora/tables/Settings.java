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
package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

@Entity
@Table(name = "settings")
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AuroraUser user;

    @Column
    private int othersCanSeeMyFollowers;

    @Column
    private int othersCanSeeWhoIAmFollowing;

    @Column
    private String language;

    @Column
    private String theme;

    public Settings() {}

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public Settings(AuroraUser user,
                    int othersCanSeeMyFollowers,
                    int othersCanSeeWhoIAmFollowing,
                    String language,
                    String theme) {
        this.user = user;
        this.othersCanSeeMyFollowers = othersCanSeeMyFollowers;
        this.othersCanSeeWhoIAmFollowing = othersCanSeeWhoIAmFollowing;
        this.language = language;
        this.theme = theme;
    }

    public int getOthersCanSeeMyFollowers() {
        return othersCanSeeMyFollowers;
    }

    public void setOthersCanSeeMyFollowers(int othersCanSeeMyFollowers) {
        this.othersCanSeeMyFollowers = othersCanSeeMyFollowers;
    }

    public int getOthersCanSeeWhoIAmFollowing() {
        return othersCanSeeWhoIAmFollowing;
    }

    public void setOthersCanSeeWhoIAmFollowing(int othersCanSeeWhoIAmFollowing) {
        this.othersCanSeeWhoIAmFollowing = othersCanSeeWhoIAmFollowing;
    }


    public Long getId() {
        return id;
    }

    public AuroraUser getUser() {
        return user;
    }

    public void setUser(AuroraUser user) {
        this.user = user;
    }
}

