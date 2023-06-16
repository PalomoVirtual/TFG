package com.ugr.monitorconsumo.controller;

import com.ugr.monitorconsumo.dto.BuildingDTO;
import com.ugr.monitorconsumo.entity.Building;
import com.ugr.monitorconsumo.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BuildingController {
    @Autowired
    BuildingService buildingService;

    @GetMapping("/building/{id}")
    BuildingDTO getBuilding(@PathVariable Long id){
        return buildingService.getBuilding(id);
    }

    @GetMapping("/building")
    List<BuildingDTO> getBuildings(){
        return buildingService.getBuildings();
    }

    @PostMapping("/building")
    BuildingDTO addBuilding(@RequestBody BuildingDTO building){
        return buildingService.addBuilding(building);
    }
}
