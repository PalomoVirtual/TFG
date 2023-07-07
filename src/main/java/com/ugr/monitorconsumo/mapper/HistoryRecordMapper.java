package com.ugr.monitorconsumo.mapper;

import com.ugr.monitorconsumo.dto.HistoryRecordDTO;
import com.ugr.monitorconsumo.dto.HistoryRecordDTOChild;
import com.ugr.monitorconsumo.dto.HistoryRecordOutDTO;
import com.ugr.monitorconsumo.entity.Building;
import com.ugr.monitorconsumo.entity.HistoryRecord;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import java.text.SimpleDateFormat;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper
public interface HistoryRecordMapper {
    HistoryRecordMapper INSTANCE = Mappers.getMapper(HistoryRecordMapper.class);

    @Mapping(source = "building", target = "buildingId", qualifiedByName = "buildingToBuildingId")
    HistoryRecordDTO historyRecordToHistoryRecordDTO(HistoryRecord historyRecord);
    HistoryRecord historyRecordDTOToHistoryRecord(HistoryRecordDTO historyRecordDTO);
//    HistoryRecordDTOChild historyRecordToHistoryRecordDTOChild(HistoryRecord historyRecord);
    @Mapping(source = "date", target = "date", qualifiedByName = "dateToString")
    @Mapping(source = "building", target = "buildingId", qualifiedByName = "buildingToBuildingId")
    HistoryRecordOutDTO historyRecordToHistoryRecordOutDTO(HistoryRecord historyRecord);
    List<HistoryRecordDTO> historyRecordListToHistoryRecordDTOList(List<HistoryRecord> history);
    List<HistoryRecordOutDTO> historyRecordListToHistoryRecordOutDTOList(List<HistoryRecord> history);

    @Named("buildingToBuildingId")
    public static Long buildingToBuildingId(Building building) {
        return building.getId();
    }

    @Named("dateToString")
    public static String dateToString(LocalDateTime date) {
//        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return date.format(formatter);
    }
}
