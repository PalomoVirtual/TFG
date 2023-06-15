package com.ugr.monitorconsumo.service;

import com.ugr.monitorconsumo.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {
    @Autowired
    HistoryRepository historyRepository;
}
