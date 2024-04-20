package com.livajusic.marko.aurora.controllers;
import com.livajusic.marko.aurora.db_repos.UserRepo;
import com.livajusic.marko.aurora.tables.AuroraUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class AuthentificationController {
    private final UserRepo userRepo;
    // private AuthenticationManager authMgr;

    public AuthentificationController(/*AuthenticationManager authMgr,*/ UserRepo userRepo) {
        // this.authMgr = authMgr;
        this.userRepo = userRepo;
    }

    @GetMapping(path = {"/register", "register.html"})
    public String register() {
        return "register";
    }

    @PostMapping("/register")
    public ResponseEntity processRegistration(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password
    ) {
        System.out.println("Registered user: " + username + " " + email + " " + password);

        AuroraUser user = new AuroraUser(username, email, password);
        userRepo.save(user);

        return new ResponseEntity<>("Succesfully registered!", HttpStatus.OK);
    }

    @GetMapping(path = {"/login", "/login.html"})
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public ResponseEntity processLogin(@RequestParam("username") String username,
                                       @RequestParam("password") String password) {

        System.out.println("TF");
        System.out.println(username + " " + password + " trying to log in...");

       /*
        Authentication authentication = authMgr.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // String token = jwtGenerator.generateToken(authentication);
*/
        return new ResponseEntity<>("Sucessfull", HttpStatus.OK);
    }
}
