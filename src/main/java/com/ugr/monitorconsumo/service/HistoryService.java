package com.ugr.monitorconsumo.service;

import com.ugr.monitorconsumo.dto.HistoryRecordDTO;
import com.ugr.monitorconsumo.dto.HistoryRecordDTOChild;
import com.ugr.monitorconsumo.dto.HistoryRecordOutDTO;
import com.ugr.monitorconsumo.entity.Building;
import com.ugr.monitorconsumo.entity.HistoryRecord;
import com.ugr.monitorconsumo.mapper.BuildingMapper;
import com.ugr.monitorconsumo.mapper.HistoryRecordMapper;
import com.ugr.monitorconsumo.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

@Service
public class HistoryService {
    @Autowired
    HistoryRepository historyRepository;

    @Autowired
    BuildingService buildingService;

    @Autowired
    HistoryRecordMapper historyRecordMapper;

    @Autowired
    BuildingMapper buildingMapper;

    @Autowired
    SimpMessagingTemplate socketTemplate;

    @Autowired
    Session emailSession;

    public HistoryRecordDTO addHistoryRecord(HistoryRecordDTO historyRecordDTO){
        Building edificioAsociado = buildingMapper.buildingDTOToBuilding(buildingService.getBuilding(historyRecordDTO.getBuildingId()));
        if(edificioAsociado.getLastAbsoluteValue() != -1){
            double consumo = historyRecordDTO.getValue() - edificioAsociado.getLastAbsoluteValue();

            HistoryRecord nuevoRecord = historyRecordMapper.historyRecordDTOToHistoryRecord(historyRecordDTO);
            nuevoRecord.setBuilding(edificioAsociado);
            nuevoRecord.setValue(consumo);
            long time = nuevoRecord.getDate().getTime();
            time = Math.round(time / 1000.0) * 1000;
            time = time - 1000*3600*2;
            long roundedTime = Math.round(time / 1000.0) * 1000;
            Timestamp ajusteZona = new Timestamp(roundedTime);
            nuevoRecord.setDate(ajusteZona);
            nuevoRecord = historyRepository.save(nuevoRecord);
            edificioAsociado.setLastAbsoluteValue(historyRecordDTO.getValue());
            buildingService.updateBuilding(edificioAsociado);

            CompletableFuture.runAsync(() -> {
                try{
                    if(edificioAsociado.isNotifications() && consumo >= edificioAsociado.getNotificationValue() && edificioAsociado.getNotificationEmail() != ""){
                        Message message = new MimeMessage(emailSession);
                        message.setFrom(new InternetAddress("p69577875@gmail.com", "Powerglimpse"));
                        message.setRecipient(Message.RecipientType.TO, new InternetAddress(edificioAsociado.getNotificationEmail()));
                        message.setSubject("Consumo máximo configurado alcanzado");
                        message.setText("Le informamos de que el consumo establecido como máximo (" +
                                edificioAsociado.getNotificationValue() + " kWh) para el edificio " +
                                edificioAsociado.getName() + " ha sido alcanzado, con un valor de " + consumo + " kWh. Este suceso ha tenido lugar en la fecha " + ajusteZona.toString());

                        Transport.send(message);
                    }
                } catch (Exception e){
                    e.printStackTrace();
                }
            });

            this.socketTemplate.convertAndSend("/topic/update", historyRecordMapper.historyRecordToHistoryRecordOutDTO(nuevoRecord));

            return historyRecordMapper.historyRecordToHistoryRecordDTO(nuevoRecord);
        }
        else{
            edificioAsociado.setLastAbsoluteValue(historyRecordDTO.getValue());
            buildingService.updateBuilding(edificioAsociado);
            return new HistoryRecordDTO();
        }

//
    }

    public void deleteById(Long id){
        historyRepository.deleteById(id);
    }

    public List<HistoryRecordDTO> getHistory(){
        return historyRecordMapper.historyRecordListToHistoryRecordDTOList(historyRepository.findAll());
    }

    public List<HistoryRecordOutDTO> getHistoryOfBuilding(Long buildingId){
        return historyRecordMapper.historyRecordListToHistoryRecordOutDTOList(historyRepository.findAllByBuildingIdOrderByDateAsc(buildingId));
    }

    public List<HistoryRecordOutDTO> getHistoryOfBuildingFiltered(Long buildingId, Timestamp fechaInicial, Timestamp fechaFinal, Double consumoInicial, Double consumoFinal ){
        if(consumoInicial == null && consumoFinal == null){
            return historyRecordMapper.historyRecordListToHistoryRecordOutDTOList(historyRepository.findByBuildingIdAndDateBetweenOrderByDateAsc(buildingId, fechaInicial, fechaFinal));
        }
        else if(fechaInicial == null && fechaFinal == null){
            if(consumoInicial == null){
                return historyRecordMapper.historyRecordListToHistoryRecordOutDTOList(historyRepository.findByBuildingIdAndValueLessThanEqualOrderByDateAsc(buildingId, consumoFinal));
            }
            else if(consumoFinal == null){
                return historyRecordMapper.historyRecordListToHistoryRecordOutDTOList(historyRepository.findByBuildingIdAndValueGreaterThanEqualOrderByDateAsc(buildingId,consumoInicial));
            }
            else{
                return historyRecordMapper.historyRecordListToHistoryRecordOutDTOList(historyRepository.findByBuildingIdAndValueBetweenOrderByDateAsc(buildingId, consumoInicial, consumoFinal));
            }
        }
        else{
            if(consumoInicial == null){
                return historyRecordMapper.historyRecordListToHistoryRecordOutDTOList(historyRepository.findByBuildingIdAndDateBetweenAndValueLessThanEqualOrderByDateAsc(buildingId, fechaInicial, fechaFinal, consumoFinal));
            }
            else if(consumoFinal == null){
                return historyRecordMapper.historyRecordListToHistoryRecordOutDTOList(historyRepository.findByBuildingIdAndDateBetweenAndValueGreaterThanEqualOrderByDateAsc(buildingId, fechaInicial, fechaFinal, consumoInicial));
            }
            else{
                return historyRecordMapper.historyRecordListToHistoryRecordOutDTOList(historyRepository.findByBuildingIdAndDateBetweenAndValueBetweenOrderByDateAsc(buildingId, fechaInicial, fechaFinal, consumoInicial, consumoFinal));
            }
        }
    }

    public List<Double> getCurrentOfBuilding(Long buildingId){
        List<HistoryRecord> top2 = historyRepository.findTop2ByBuildingIdOrderByDateDesc(buildingId);
        List<Double> top2Values = new ArrayList<Double>();
        top2Values.add(-1.0);
        top2Values.add(-1.0);
        if(top2.size() >= 1){
            top2Values.set(0, top2.get(0).getValue());
        }
        if(top2.size() == 2){
            top2Values.set(1, top2.get(1).getValue());
        }
        return top2Values;
    }
}
