package com.ugr.monitorconsumo.configuration;

import com.ugr.monitorconsumo.mapper.BuildingMapper;
import com.ugr.monitorconsumo.mapper.HistoryRecordMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import java.util.Properties;

@Configuration
public class ApplicationConfiguration implements WebMvcConfigurer {
    @Bean
    public BuildingMapper buildingMapper(){
        return BuildingMapper.INSTANCE;
    }

    @Bean
    public HistoryRecordMapper historyRecordMapper(){
        return HistoryRecordMapper.INSTANCE;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // o tu dominio
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH");
    }

    @Bean
    public Session getEmailSession(){
        final String username = "p69577875@gmail.com";
        final String password = "pudcoiwvioxktvzb";

        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", true);
        prop.put("mail.smtp.starttls.enable", true);
        prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        prop.put("mail.smtp.ssl.protocols", "TLSv1.2");

        return Session.getInstance(prop, new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
            }
        );
    }
}
