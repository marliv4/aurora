package com.livajusic.marko.aurora.services;

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

    public SettingsService() {

    }

    public String getUsersLanguage(Long userId) {
        Query query = entityManager.createQuery("SELECT language FROM Settings WHERE user.userId = :userId");
        query.setParameter("userId", userId);
        return (String)query.getSingleResult();
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
        return (String)query.getSingleResult();
    }

    @Transactional
    public void updateUsersTheme(Long userId, String theme) {
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

        return (int)query.getSingleResult() == 1;
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

        return (int)query.getSingleResult() == 1;
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
}
