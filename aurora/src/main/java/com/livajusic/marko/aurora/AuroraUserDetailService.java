package com.livajusic.marko.aurora;

import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.services.UserService;
import com.livajusic.marko.aurora.tables.AuroraUser;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class AuroraUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final var user = userRepo.findByUsername(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException(username);
        } else {
            final var userObj = user.get();
            return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(getRoles(userObj.getId()))
                    .build();
        }
    }

    public String[] getRoles(Long userId) {
        if (userId == 0) {
            String[] role = {"admin"};
            return role;
        }
        Query query = entityManager.createQuery("SELECT r.role FROM Role r WHERE r.userId = :id");
        query.setParameter("id", userId);

        List<String> res = query.getResultList();
        return res.toArray(new String[res.size()]);
    }
}
