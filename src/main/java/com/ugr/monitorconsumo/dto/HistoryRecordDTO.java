package com.ugr.monitorconsumo.dto;

import com.ugr.monitorconsumo.entity.Building;
import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.Objects;

public class HistoryRecordDTO {
    private Long id;

    private Timestamp date;

    private double value;

    private BuildingDTO building;

    public HistoryRecordDTO() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public BuildingDTO getBuilding() {
        return building;
    }

    public void setBuilding(BuildingDTO building) {
        this.building = building;
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
