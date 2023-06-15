package com.ugr.monitorconsumo.service;

import com.ugr.monitorconsumo.repository.BuildingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BuildingService {
    @Autowired
    BuildingRepository buildingRepository;
}
