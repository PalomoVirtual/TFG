package com.ugr.monitorconsumo.service;

import com.ugr.monitorconsumo.dto.BuildingDTO;
import com.ugr.monitorconsumo.entity.Building;
import com.ugr.monitorconsumo.entity.HistoryRecord;
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
    HistoryService historyRecordService;

    @Autowired
    BuildingMapper buildingMapper;

    public BuildingDTO getBuilding(Long id){
        System.out.println(id);
        return buildingMapper.buildingToBuildingDTO(buildingRepository.getReferenceById(id));
    }

    public List<BuildingDTO> getBuildings(){
        return buildingMapper.buildingsToBuildingsDTO(buildingRepository.findAll());
    }

    public BuildingDTO addBuilding(BuildingDTO buildingDTO){
        return buildingMapper.buildingToBuildingDTO(buildingRepository.save(buildingMapper.buildingDTOToBuilding(buildingDTO)));
    }

    public void updateBuildingNotifications(BuildingDTO buildingDTO){
        buildingRepository.actualizarNotificaciones(buildingDTO.getId(), buildingDTO.getNotificationValue(), buildingDTO.getNotificationEmail(), buildingDTO.isNotifications());
    }

    public void updateBuildingRegularData(BuildingDTO buildingDTO){
        buildingRepository.actualizarRegularData(buildingDTO.getId(), buildingDTO.getName(), buildingDTO.getAddress(), buildingDTO.getPhoneNumber(), buildingDTO.getAdditionalComment());
    }

    public void deleteBuilding(Long id){
        Building edificio = buildingRepository.getReferenceById(id);
        for(HistoryRecord history : edificio.getHistory()){
            historyRecordService.deleteById(history.getId());
        }

        buildingRepository.deleteById(id);
    }

    public void updateBuilding(Building building){
        buildingRepository.save(building);
    }


}
