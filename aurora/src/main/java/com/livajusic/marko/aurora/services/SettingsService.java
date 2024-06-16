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

    public boolean isUsersProfilePrivate(Long userId) {
        Query query = entityManager.createQuery("SELECT privateProfile FROM Settings WHERE user.userId = :userId");
        query.setParameter("userId", userId);

        return (Integer) query.getSingleResult() == 1 ? true : false;
    }

    @Transactional
    public void updateProfilePrivacy(Long userId, Integer privateProfile) {
        Query query = entityManager.createQuery("UPDATE Settings s SET s.privateProfile = :privateProfile WHERE s.user.userId = :userId");
        query.setParameter("privateProfile", privateProfile);
        query.setParameter("userId", userId);

        query.executeUpdate();
        entityManager.flush();
    }
}
