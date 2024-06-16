package com.livajusic.marko.aurora;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.server.VaadinSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;
import java.util.ResourceBundle;
import org.springframework.context.support.ResourceBundleMessageSource;

@Component
public class LanguagesController {
    private static final String BUNDLE_NAME = "lang/messages";

    public static String getMessage(String key) {
        Locale locale = VaadinSession.getCurrent().getLocale();
        ResourceBundle bundle = ResourceBundle.getBundle(BUNDLE_NAME, locale);
        return bundle.getString(key);
    }

    public String get(String item) {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasenames(BUNDLE_NAME);
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setFallbackToSystemLocale(false);
        return messageSource.getMessage(item, null, VaadinSession.getCurrent().getLocale());
    }

    private void setLocale(Locale locale) {
        VaadinSession.getCurrent().setLocale(locale);
    }

    public String getCurrentLanguage() {
        final var locale = VaadinSession.getCurrent().getLocale();
        String out = "English";
        if (locale == Locale.GERMAN) {
            out = "Deutsch";
        }
        return out;
    }

    public void switchLanguage(String language) {
        Locale locale;
        switch (language) {
            case "Deutsch":
                setLocale(Locale.GERMAN);
                break;
            default:
                setLocale(Locale.ENGLISH);
                break;
        }
        UI.getCurrent().getPage().reload();
    }

}
