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
package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.db_repos.SettingsRepo;
import com.livajusic.marko.aurora.tables.Settings;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class SettingsService {
    @Autowired
    private SettingsRepo settingsRepo;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserService userService;

    public SettingsService() {}

    public LanguagesController.Language getUsersLanguage(Long userId) {
        Query query = entityManager.createQuery("SELECT language FROM Settings WHERE user.userId = :userId");
        query.setParameter("userId", userId);
        String lang =  (String)query.getSingleResult();
        if (lang.equals("English")) return LanguagesController.Language.English;

        else return LanguagesController.Language.German;
    }

    @Transactional
    public void updateUsersLanguage(Long userId, String language) {
        Query query = entityManager.createQuery("UPDATE Settings s SET s.language = :language WHERE s.user.userId = :userId");
        query.setParameter("userId", userId);
        query.setParameter("language", language);

        query.executeUpdate();
        entityManager.flush();
    }

    public String getUsersTheme(Long userId) {
        Query query = entityManager.createQuery("SELECT theme FROM Settings WHERE user.userId = :userId");
        query.setParameter("userId", userId);
        return (char)query.getSingleResult() == 'd' ? "Dark" : "Light";
    }

    @Transactional
    public void updateUsersTheme(Long userId, char theme) {
        Query query = entityManager.createQuery("UPDATE Settings s SET s.theme = :theme WHERE s.user.userId = :userId");
        query.setParameter("userId", userId);
        query.setParameter("theme", theme);

        query.executeUpdate();
        entityManager.flush();
    }

    public boolean canOthersSeeFollowers(Long userId) {
        Query query = entityManager.createQuery("SELECT othersCanSeeMyFollowers " +
                "FROM Settings " +
                "WHERE user.userId = :userId");
        query.setParameter("userId", userId);

        return (boolean)query.getSingleResult();
    }

    @Transactional
    public void updateCanOthersSeeFollowers(Long userId, boolean yes) {
        int value = yes ? 1 : 0;
        Query query = entityManager.createQuery("UPDATE Settings s SET s.othersCanSeeMyFollowers = :value WHERE s.user.userId = :userId");
        query.setParameter("userId", userId);
        query.setParameter("value", value);

        query.executeUpdate();
        entityManager.flush();
    }

    public boolean canOthersSeeFollowing(Long userId) {
        Query query = entityManager.createQuery("SELECT othersCanSeeWhoIAmFollowing " +
                "FROM Settings " +
                "WHERE user.userId = :userId");
        query.setParameter("userId", userId);

        return (boolean)query.getSingleResult();
    }

    @Transactional
    public void updateCanOthersSeeFollowing(Long userId, boolean yes) {
        int value = yes ? 1 : 0;
        Query query = entityManager.createQuery("UPDATE Settings s SET s.othersCanSeeWhoIAmFollowing = :value WHERE s.user.userId = :userId");
        query.setParameter("userId", userId);
        query.setParameter("value", value);

        query.executeUpdate();
        entityManager.flush();
    }

    public boolean canOthersSeeWhatILiked(Long userId) {
        Query query = entityManager.createQuery("SELECT othersCanSeeWhatILiked " +
                "FROM Settings " +
                "WHERE user.userId = :userId");
        query.setParameter("userId", userId);

        return (boolean)query.getSingleResult();
    }

    @Transactional
    public void updateCanOthersSeeWhatILiked(Long userId, boolean yes) {
        Query query = entityManager.createQuery("UPDATE Settings s " +
                "SET s.othersCanSeeWhatILiked = :yes " +
                "WHERE user.userId = :userId");
        query.setParameter("userId", userId);
        query.setParameter("yes", yes);

        query.executeUpdate();
        entityManager.flush();
    }
}
