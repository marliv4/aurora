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

import com.livajusic.marko.aurora.AuroraUserDetailService;
import com.livajusic.marko.aurora.db_repos.RoleRepo;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.views.MyProfileView;
import com.livajusic.marko.aurora.views.UserProfileView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.notification.Notification;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    @PersistenceContext
    private EntityManager entityManager;

    private final AuthenticationContext authenticationContext;

    private final AuroraUserDetailService userDetailService;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;


    public UserService(
            AuthenticationContext authenticationContext,
            AuroraUserDetailService userDetailService,
            PasswordEncoder passwordEncoder) {
        this.authenticationContext = authenticationContext;
        this.userDetailService = userDetailService;
        this.passwordEncoder = passwordEncoder;
    }

    public String getBio(Long userId) {
        Query query;
        try {
            query = entityManager.createQuery("SELECT u.bio " +
                    "FROM AuroraUser u " +
                    "WHERE u.id = :userId");
            query.setParameter("userId", userId);
        } catch (NoResultException e) {
            e.printStackTrace();
            return null;
        }

        return (String) query.getSingleResult();
    }

    @Transactional
    public int updateBio(Long userId, String newBio) {
        Query query = entityManager.createQuery("UPDATE AuroraUser " +
                "SET bio = :newBio " +
                "WHERE userId = :userId");
        query.setParameter("userId", userId);
        query.setParameter("newBio", newBio);
        return query.executeUpdate();
    }

    public String getEmail(Long userId) {
        Query query;
        try {
            query = entityManager.createQuery("SELECT u.email " +
                    "FROM AuroraUser u " +
                    "WHERE u.id = :userId");
            query.setParameter("userId", userId);
        } catch (NoResultException e) {
            e.printStackTrace();
            return null;
        }

        return (String) query.getSingleResult();
    }

    public String getEmail(String username) {
        Query query;
        try {
            query = entityManager.createQuery("SELECT u.email FROM AuroraUser u WHERE u.username = :username");
            query.setParameter("username", username);
        } catch (NoResultException e) {
            e.printStackTrace();
            return null;
        }

        return (String) query.getSingleResult();
    }

    public String getPassword(String username) {
        Query query = entityManager.createQuery("SELECT u.password FROM AuroraUser u WHERE u.username = :username");
        query.setParameter("username", username);
        return (String) query.getSingleResult();
    }

    @Transactional
    public int updatePassword(Long userId, String newPassword) {
        Query query = entityManager.createQuery("UPDATE AuroraUser SET password = :newPassword WHERE userId = :userId");
        query.setParameter("newPassword", passwordEncoder.encode(newPassword));
        query.setParameter("userId", userId);
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

    public String getUsernameById(Long userId) {
        Query query = entityManager.createQuery("SELECT u.username FROM AuroraUser u WHERE u.userId = :userId");
        query.setParameter("userId", userId);
        return (String) query.getSingleResult();
    }

    public Long getCurrentUserId() {
        return getUserIdByUsername(getCurrentUsername()).get();
    }

    public boolean isLoggedIn() {
        return !getCurrentUsername().equals("anonymousUser");
    }

    @Transactional
    public void searchForUser(String username) {
        // If user exists, go to his profile
        if (getEmail(username) != null) {
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

    @Transactional
    public Optional<Long> getUserIdByUsername(String username) {
        try {
            Query query = entityManager.createQuery("SELECT u.userId FROM AuroraUser u WHERE u.username = :username");
            query.setParameter("username", username);
            return Optional.of((Long) query.getSingleResult());
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    public void logout() {
        authenticationContext.logout();
        System.out.println("LOGOUT");
        VaadinSession.getCurrent().getSession().invalidate();
    }

    public List<String> getRoles(Long userId) {
        Query query = entityManager.createQuery("SELECT r.role " +
                "FROM Role r " +
                "WHERE r.userId = :userId");
        query.setParameter("userId", userId);

        final var list = (List<String>) query.getResultList();
        ;
        for (Object l : list) {
            System.out.println(l);
        }

        return list;
    }

    public AuroraUser getUserById(Long userId) {
        Query query = entityManager.createQuery("SELECT au FROM AuroraUser au where au.userId = :userId");
        query.setParameter("userId", userId);

        return (AuroraUser) query.getSingleResult();
    }

    public boolean isUserMod(Long userId) {
        return getRoles(userId).contains("mod");
    }

    public List<Object[]> findAllByUserIdAndPfp(Long userId) {
        Query query = entityManager.createQuery("SELECT ag, pfp.imageData " +
                "FROM AuroraGIF ag " +
                "JOIN AuroraUser au " +
                "ON ag.user.userId = au.userId " +
                "JOIN ProfilePicture pfp " +
                "ON au.userId = pfp.user.userId " +
                "WHERE au.userId = :userId");
        query.setParameter("userId", userId);

        return query.getResultList();
    }

}
