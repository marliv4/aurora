package com.livajusic.marko.aurora.views;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@PageTitle("Main")
@Route(value = "/")
@AnonymousAllowed
public class HomeView extends HorizontalLayout {

    public HomeView() {
        NavigationBar navbar = new NavigationBar();
        add(navbar);
    }

}
