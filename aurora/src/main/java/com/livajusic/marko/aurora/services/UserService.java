package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.AuroraUserDetailService;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.views.UserProfileView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.page.WebStorage;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.spring.security.AuthenticationContext;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @PersistenceContext
    private EntityManager entityManager;

    private final AuthenticationContext authenticationContext;

    private final AuroraUserDetailService userDetailService;

    @Autowired
    private UserRepo userRepo;

    public UserService(
            AuthenticationContext authenticationContext,
            AuroraUserDetailService userDetailService) {
        this.authenticationContext = authenticationContext;
        this.userDetailService = userDetailService;
    }

    public String getEmail(String username) {
        try {
            Query query = entityManager.createQuery("SELECT u.email FROM AuroraUser u WHERE u.username = :username");
            query.setParameter("username", username);
            return (String) query.getSingleResult();
        } catch (NoResultException e) {
            e.printStackTrace();
            return "";
        }
    }

    public String getPassword(String username) {
        Query query = entityManager.createQuery("SELECT u.password FROM AuroraUser u WHERE u.username = :username");
        query.setParameter("username", username);
        return (String) query.getSingleResult();
    }

    @Transactional
    public int updatePassword(String uname, String newPassword) {
        Query query = entityManager.createQuery("UPDATE AuroraUser SET password = :newPassword WHERE username = :uname");
        query.setParameter("newPassword", newPassword);
        query.setParameter("uname", uname);
        return query.executeUpdate();
    }

    public String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    public boolean isLoggedIn() {
        return !getCurrentUsername().equals("anonymousUser");
    }

    public String getUserInfo(String username) {
        return getEmail(username) + " ";
    }

    public void searchForUser(String username) {
        // If user exists, go to his profile
        if (!getEmail(username).isEmpty()) {
            System.out.println("Searching for: " + username);
            UI.getCurrent().navigate(UserProfileView.class, username);
        } else {
            Notification.show("User not found!", 2000, Notification.Position.BOTTOM_CENTER);
        }
    }

    public long getUserIdByUsername(String username) {
        Query query = entityManager.createQuery("SELECT u.userId FROM AuroraUser u WHERE u.username = :username");
        query.setParameter("username", username);
        return (long)query.getSingleResult();
    }

    @Transactional
    public int updateProfilePrivacy(String username, int publicProfile) {
        String jpql = "UPDATE PrivacySettings p SET p.privacyEnabled = :publicProfile " +
                "WHERE p.user.id = (SELECT u.id FROM AuroraUser u WHERE u.username = :username)";
        Query query = entityManager.createQuery(jpql);
        query.setParameter("publicProfile", publicProfile);
        query.setParameter("username", username);
        return query.executeUpdate();
    }

    public void logout() {
        authenticationContext.logout();
        System.out.println("LOGOUT");
        VaadinSession.getCurrent().getSession().invalidate();
    }

}