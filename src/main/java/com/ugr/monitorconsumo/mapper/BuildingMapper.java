package com.ugr.monitorconsumo.mapper;

import com.ugr.monitorconsumo.dto.BuildingDTO;
import com.ugr.monitorconsumo.entity.Building;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface BuildingMapper {
    BuildingMapper INSTANCE = Mappers.getMapper(BuildingMapper.class);

    BuildingDTO buildingToBuildingDTO(Building building);
    Building buildingDTOToBuilding(BuildingDTO buildingDTO);
    List<BuildingDTO> buildingsToBuildingsDTO(List<Building> buildings);
}
