package com.ugr.monitorconsumo.mapper;

import com.ugr.monitorconsumo.dto.HistoryRecordDTO;
import com.ugr.monitorconsumo.dto.HistoryRecordDTOChild;
import com.ugr.monitorconsumo.entity.HistoryRecord;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HistoryRecordMapper {
    HistoryRecordMapper INSTANCE = Mappers.getMapper(HistoryRecordMapper.class);

    HistoryRecordDTO historyRecordToHistoryRecordDTO(HistoryRecord historyRecord);
    HistoryRecord historyRecordDTOToHistoryRecord(HistoryRecordDTO historyRecordDTO);
    HistoryRecordDTOChild historyRecordToHistoryRecordDTOChild(HistoryRecord historyRecord);
}
