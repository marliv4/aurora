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

    public enum Language {
        English,
        German
    }

    public void switchLanguage(Language language) {
        Locale locale = null;
        if (language == Language.German) {
            locale = Locale.GERMAN;
            setLocale(Locale.GERMAN);
        } else {
            locale = Locale.ENGLISH;
            setLocale(Locale.ENGLISH);
        }

        UI.getCurrent().getLocale();
        UI.getCurrent().setLocale(locale);
        UI.getCurrent().getPage().reload();
    }

}
