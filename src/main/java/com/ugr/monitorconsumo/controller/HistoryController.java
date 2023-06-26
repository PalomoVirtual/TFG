package com.ugr.monitorconsumo.controller;

import com.ugr.monitorconsumo.dto.BuildingDTO;
import com.ugr.monitorconsumo.dto.HistoryRecordDTO;
import com.ugr.monitorconsumo.dto.HistoryRecordOutDTO;
import com.ugr.monitorconsumo.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class HistoryController {
    @Autowired
    HistoryService historyService;

    @GetMapping("/history")
    List<HistoryRecordDTO> getHistory(){
        return historyService.getHistory();
    }

    @GetMapping("/history/{buildingId}")
    List<HistoryRecordOutDTO> getHistoryOfBuilding(@PathVariable Long buildingId){
        return historyService.getHistoryOfBuilding(buildingId);
    }

    @GetMapping("/history/{buildingId}/from")
    List<HistoryRecordOutDTO> getHistoryOfBuildingFromDate(@PathVariable Long buildingId, @RequestParam("fechaMinimaSinIncluir") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaMinimaSinIncluir){
        return historyService.getHistoryOfBuildingFromDate(buildingId, Timestamp.valueOf(fechaMinimaSinIncluir));
    }

    @GetMapping("/history/{buildingId}/current")
    List<Double> getCurrentOfBuilding(@PathVariable Long buildingId){
        return historyService.getCurrentOfBuilding(buildingId);
    }

    @PostMapping("/history")
    HistoryRecordDTO addHistoryRecord(@RequestBody HistoryRecordDTO historyRecord){
        return historyService.addHistoryRecord(historyRecord);
    }
}
