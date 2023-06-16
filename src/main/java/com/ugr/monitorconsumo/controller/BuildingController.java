package com.ugr.monitorconsumo.controller;

import com.ugr.monitorconsumo.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController Controller
public class BuildingController {
    @Autowired
    BuildingService buildingService;

    @GetMapping

}
