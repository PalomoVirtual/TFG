package com.ugr.monitorconsumo.controller;

import com.ugr.monitorconsumo.dto.BuildingDTO;
import com.ugr.monitorconsumo.dto.HistoryRecordDTO;
import com.ugr.monitorconsumo.dto.HistoryRecordOutDTO;
import com.ugr.monitorconsumo.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    List<HistoryRecordOutDTO> getHistoryOfBuildingFiltered(@PathVariable Long buildingId, @RequestParam(value="fechaInicial", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaInicial,
                                                           @RequestParam(value="fechaFinal", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaFinal,
                                                           @RequestParam(value="consumoInicial", required = false) Double consumoInicial,
                                                           @RequestParam(value="consumoFinal", required = false) Double consumoFinal){

        return historyService.getHistoryOfBuildingFiltered(buildingId, fechaInicial, fechaFinal, consumoInicial, consumoFinal);
    }

    @GetMapping("/history/{buildingId}/current")
    List<Double> getCurrentOfBuilding(@PathVariable Long buildingId){
        return historyService.getCurrentOfBuilding(buildingId);
    }

    @PostMapping("/history")
    HistoryRecordDTO addHistoryRecord(@RequestBody HistoryRecordDTO historyRecord){
        return historyService.addHistoryRecord(historyRecord);
    }

    @GetMapping("/history/{buildingId}/minMax")
    List<Double> getMinMaxOfBuilding(@PathVariable Long buildingId){
        return historyService.getMinMaxOfBuilding(buildingId);
    }
}
