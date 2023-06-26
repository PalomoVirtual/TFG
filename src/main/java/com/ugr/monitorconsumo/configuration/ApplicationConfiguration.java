package com.ugr.monitorconsumo.configuration;

import com.ugr.monitorconsumo.mapper.BuildingMapper;
import com.ugr.monitorconsumo.mapper.HistoryRecordMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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
}
