package com.livajusic.marko.aurora;

import com.vaadin.flow.server.VaadinSession;

import java.util.Locale;
import java.util.ResourceBundle;

public class LanguagesController {
    private static final String BUNDLE_NAME = "lang/";

    public static String getMessage(String key) {
        Locale locale = VaadinSession.getCurrent().getLocale();
        ResourceBundle bundle = ResourceBundle.getBundle(BUNDLE_NAME, locale);
        return bundle.getString(key);
    }
}
