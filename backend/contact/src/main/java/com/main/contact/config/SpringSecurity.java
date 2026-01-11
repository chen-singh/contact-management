package com.main.contact.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.SecurityBuilder;

import org.springframework.security.config.annotation.web.WebSecurityConfigurer;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SpringSecurity implements WebSecurityConfigurer {

    @Override
    public void init(SecurityBuilder builder) {

    }

    @Override
    public void configure(SecurityBuilder builder) {

    }
}
