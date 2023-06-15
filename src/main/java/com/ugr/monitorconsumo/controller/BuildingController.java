package com.ugr.monitorconsumo.controller;

import com.ugr.monitorconsumo.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class BuildingController {
    @Autowired
    BuildingService buildingService;
}
