package com.livajusic.marko.aurora.services;

import com.livajusic.marko.aurora.AuroraUserDetailService;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.views.MyProfileView;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @PersistenceContext
    private EntityManager entityManager;

    private final AuthenticationContext authenticationContext;

    private final AuroraUserDetailService userDetailService;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepo userRepo;


    public UserService(
            AuthenticationContext authenticationContext,
            AuroraUserDetailService userDetailService,
            PasswordEncoder passwordEncoder) {
        this.authenticationContext = authenticationContext;
        this.userDetailService = userDetailService;
        this.passwordEncoder = passwordEncoder;
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
    public int updatePassword(String username, String newPassword) {
        Query query = entityManager.createQuery("UPDATE AuroraUser SET password = :newPassword WHERE username = :username");
        query.setParameter("newPassword", passwordEncoder.encode(newPassword));
        query.setParameter("username", username);
        return query.executeUpdate();
    }

    @Transactional
    public int updateUsername(Long userId, String newUsername) {
        Query query = entityManager.createQuery("UPDATE AuroraUser SET username = :newUsername WHERE userId = :userId");
        query.setParameter("newUsername", newUsername);
        query.setParameter("userId", userId);
        return query.executeUpdate();
    }


    @Transactional
    public int updateEmail(Long userId, String newEmail) {
        Query query = entityManager.createQuery("UPDATE AuroraUser SET email = :newEmail WHERE userId = :userId");
        query.setParameter("newEmail", newEmail);
        query.setParameter("userId", userId);
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
            if (username.equals(getCurrentUsername())) {
                UI.getCurrent().navigate(MyProfileView.class);
                return;
            }
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