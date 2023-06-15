package com.ugr.monitorconsumo.controller;

import com.ugr.monitorconsumo.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class HistoryController {
    @Autowired
    HistoryService historyService;
}
