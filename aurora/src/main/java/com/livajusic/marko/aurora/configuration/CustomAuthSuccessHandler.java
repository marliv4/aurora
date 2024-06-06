package com.livajusic.marko.aurora.configuration;

import com.vaadin.flow.server.VaadinSession;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class CustomAuthSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    public CustomAuthSuccessHandler() {
        System.out.println("CustomAuthSuccessHandler()");
    }
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {

        Optional<VaadinSession> maybeSession = VaadinSession.getAllSessions(
                request.getSession()).stream().findFirst();
        maybeSession.ifPresent(session -> {
            // session.accessSynchronously(/* do something with session */);
        });
        System.out.println("pls()");
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
