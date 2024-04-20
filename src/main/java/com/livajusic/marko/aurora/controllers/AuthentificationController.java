package com.livajusic.marko.aurora.controllers;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
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

    @GetMapping("/register")
    public String register() {
        return "join/register_tab";
    }

    @GetMapping("/login")
    public String login() {
        return "join/login_tab";
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

    @GetMapping(path = {"/join", "/join.html", "/join/" })
    public String join() {
        return "join";
    }

    @PostMapping("/login")
    public ResponseEntity processLogin(@RequestParam("username") String username,
                                       @RequestParam("password") String password) {

        System.out.println("Username logging in: " + username);


        /*
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());

        Authentication authentication = authMgr.authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
       /*
        Authentication authentication = authMgr.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // String token = jwtGenerator.generateToken(authentication);
*/
        return new ResponseEntity<>("Successful!", HttpStatus.OK);
    }
}
