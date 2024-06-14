package com.livajusic.marko.aurora;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;
import com.vaadin.flow.theme.material.Material;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.ResourceBundleMessageSource;

import java.util.Locale;

@SpringBootApplication(exclude = ErrorMvcAutoConfiguration.class)
// @Theme(value = "aurora_theme", variant = Lumo.DARK)
public class AuroraApplication implements AppShellConfigurator {

	public static void main(String[] args) {
		SpringApplication.run(AuroraApplication.class, args);
	}

}
