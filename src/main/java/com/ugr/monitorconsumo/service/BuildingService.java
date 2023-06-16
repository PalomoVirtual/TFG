package com.ugr.monitorconsumo.service;

import com.ugr.monitorconsumo.dto.BuildingDTO;
import com.ugr.monitorconsumo.mapper.BuildingMapper;
import com.ugr.monitorconsumo.repository.BuildingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BuildingService {
    @Autowired
    BuildingRepository buildingRepository;

    @Autowired
    BuildingMapper buildingMapper;

    public BuildingDTO getBuilding(Long id){
        return buildingMapper.buildingToBuildingDTO(buildingRepository.getReferenceById(id));
    }

    public List<BuildingDTO> getBuildings(){
        return buildingMapper.buildingsToBuildingsDTO(buildingRepository.findAll());
    }

    public BuildingDTO addBuilding(BuildingDTO buildingDTO){
        return buildingMapper.buildingToBuildingDTO(buildingRepository.save(buildingMapper.buildingDTOToBuilding(buildingDTO)));
    }
}
