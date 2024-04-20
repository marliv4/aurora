package com.livajusic.marko.aurora.controllers;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.security.core.context.SecurityContextHolder;


@Controller
public class AuthentificationController {
    private final UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public AuthentificationController(/*AuthenticationManager authMgr,*/ UserRepo userRepo) {
        // this.authMgr = authMgr;
        this.userRepo = userRepo;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/register")
    public ResponseEntity processRegistration(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password
    ) {
        System.out.println("Registered user: " + username + " " + email + " " + password);

        AuroraUser user = new AuroraUser();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");
        userRepo.save(user);

        return new ResponseEntity<>("Succesfully registered!", HttpStatus.OK);
    }

    @GetMapping(path = {"/register"})
    public String join() {
        return "register";
    }

    @PostMapping("/login")
    public ResponseEntity processLogin(@RequestParam("l_username") String username,
                                       @RequestParam("l_password") String password) {

        System.out.println("PLS");
        System.out.println("Username logging in: " + username + " with a password " + password);


        final var user = userRepo.findByUsername(username);
        boolean exists = user.isPresent();

        if (exists) {
            System.out.println(user.get().getEmail());
            System.out.println(user.get().getPassword());
        }

        return new ResponseEntity<>("Successful!", HttpStatus.OK);
    }
}
