package com.ugr.monitorconsumo.configuration;

import com.ugr.monitorconsumo.mapper.BuildingMapper;
import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfiguration {
    @Bean
    public BuildingMapper buildingMapper(){
        return BuildingMapper.INSTANCE;
    }
}
