package com.livajusic.marko.aurora.configuration;

import com.livajusic.marko.aurora.services.ValuesService;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {
    private final ValuesService valuesService;

    public StaticResourceConfiguration(ValuesService valuesService) {
        this.valuesService = valuesService;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/images/");
    }
}
