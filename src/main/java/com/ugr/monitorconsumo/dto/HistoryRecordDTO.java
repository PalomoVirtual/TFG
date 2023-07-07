package com.ugr.monitorconsumo.dto;

import com.ugr.monitorconsumo.entity.Building;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

public class HistoryRecordDTO {
    private Long id;

    private LocalDateTime date;

    private double value;

    private Long buildingId;

    public HistoryRecordDTO() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public Long getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(Long buildingId) {
        this.buildingId = buildingId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HistoryRecordDTO that = (HistoryRecordDTO) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
