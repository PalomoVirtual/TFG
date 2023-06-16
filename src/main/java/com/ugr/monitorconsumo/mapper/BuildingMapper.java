package com.ugr.monitorconsumo.mapper;

import com.ugr.monitorconsumo.dto.BuildingDTO;
import com.ugr.monitorconsumo.entity.Building;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BuildingMapper {
    BuildingMapper INSTANCE = Mappers.getMapper(BuildingMapper.class);

    BuildingDTO buildingToBuildingDTO(Building building);
    Building buildingDTOToBuilding(BuildingDTO buildingDTO);
}
