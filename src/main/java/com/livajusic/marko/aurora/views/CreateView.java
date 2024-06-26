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
package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.services.NotificationService;
import com.livajusic.marko.aurora.services.ProfilePictureService;
import com.livajusic.marko.aurora.services.SettingsService;
import com.livajusic.marko.aurora.services.UserService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.Tag;
import jakarta.annotation.security.RolesAllowed;
import org.atmosphere.interceptor.AtmosphereResourceStateRecovery;

@Route("/create")
@RolesAllowed(value = {"user", "mod", "admin"})
@Tag("webgl-component")
@JsModule("./creator.js")
public class CreateView extends VerticalLayout {

    private DynamicWebGLComponent webGLComponent;
    private Tabs tabs;

    public CreateView(UserService userService,
                      ProfilePictureService profilePictureService,
                      LanguagesController languagesController,
                      SettingsService settingsService,
                      NotificationService notificationService) {
        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
        add(navbar);
        // Initialize the WebGLComponent
        webGLComponent = new DynamicWebGLComponent();
        webGLComponent.setId("webgl-component");
        webGLComponent.setWidth("100%");
        webGLComponent.setHeight("400px");

        // Initial base code for cube
        String initialCubeCode = "cube.material.color.set(0x00ff00);";
        webGLComponent.executeUserCode(initialCubeCode);

        // Create tabs for Mandelbrot fractal and Cube
        Tab cubeTab = new Tab("Cube");
        Tab mandelbrotTab = new Tab("Mandelbrot Fractal");

        tabs = new Tabs(cubeTab, mandelbrotTab);
        tabs.setOrientation(Tabs.Orientation.HORIZONTAL);

        // Event listener for tab selection
        tabs.addSelectedChangeListener(event -> {
            Tab selectedTab = tabs.getSelectedTab();
            if (selectedTab.equals(cubeTab)) {
                // Switch to Cube visualization
                // webGLComponent.executeUserCode(cubeCode);
            } else if (selectedTab.equals(mandelbrotTab)) {
                String mandelbrotCode = "/* Insert Mandelbrot fractal code here */";
                webGLComponent.executeUserCode(mandelbrotCode);
            }
        });

        Button renderButton = new Button("Render");
        renderButton.addClickListener(l -> {
            Page page = getUI().get().getPage();
            page.executeJs("downloadGIF();");
        });

        setAlignItems(FlexComponent.Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);
        add(tabs, renderButton, webGLComponent);
    }

    @Tag("dynamic-webgl-component")
    @JsModule("./creator.js")
    public static class DynamicWebGLComponent extends Div {
        public void executeUserCode(String code) {
            Page page = UI.getCurrent().getPage();
            System.out.println(String.format("Trying to execute: %s", code));
            page.executeJs(code);
        }
    }
}
