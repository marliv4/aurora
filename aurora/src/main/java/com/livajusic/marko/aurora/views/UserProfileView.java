package com.livajusic.marko.aurora.views;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@PageTitle("Main")
@Route(value = "/profile")
@AnonymousAllowed
public class UserProfileView extends Div implements HasUrlParameter<String> {
    private H3 usernameText;
    public UserProfileView() {
        usernameText = new H3();
        add(usernameText);
    }

    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        loadUserProfile(parameter);
    }

    private void loadUserProfile(String username) {
        usernameText.setText("Profile of user: " + username);
    }
}
