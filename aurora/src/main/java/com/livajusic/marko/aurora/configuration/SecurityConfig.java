package com.livajusic.marko.aurora.configuration;

import com.livajusic.marko.aurora.AuroraUserDetailService;
import com.livajusic.marko.aurora.views.LoginView;
import com.vaadin.flow.spring.security.VaadinSavedRequestAwareAuthenticationSuccessHandler;
import com.vaadin.flow.spring.security.VaadinWebSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurity {
    @Autowired
    private AuroraUserDetailService userDetailService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth ->
                auth.requestMatchers(
                        AntPathRequestMatcher.antMatcher(HttpMethod.GET, "/images/*.png")).permitAll()
            )
                .formLogin(login -> login
                        .loginPage("/login")
                        // .successHandler(customAuthSuccessHandler)
                        .defaultSuccessUrl("/", true)
                );
        super.configure(http);
        setLoginView(http, LoginView.class);
    }

    @Bean
    public UserDetailsService userDetailsManager() {
        return userDetailService;

    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailService);
        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private VaadinSavedRequestAwareAuthenticationSuccessHandler getVaadinSavedRequestAwareAuthenticationSuccessHandler(HttpSecurity http) {
        VaadinSavedRequestAwareAuthenticationSuccessHandler vaadinSavedRequestAwareAuthenticationSuccessHandler = new VaadinSavedRequestAwareAuthenticationSuccessHandler();
        vaadinSavedRequestAwareAuthenticationSuccessHandler.setDefaultTargetUrl(this.applyUrlMapping(""));
        RequestCache requestCache = (RequestCache)http.getSharedObject(RequestCache.class);
        if (requestCache != null) {
            vaadinSavedRequestAwareAuthenticationSuccessHandler.setRequestCache(requestCache);
        }

        http.setSharedObject(VaadinSavedRequestAwareAuthenticationSuccessHandler.class, vaadinSavedRequestAwareAuthenticationSuccessHandler);
        return vaadinSavedRequestAwareAuthenticationSuccessHandler;
    }
}