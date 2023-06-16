package com.ugr.monitorconsumo.dto;

import java.util.Objects;
import java.util.Set;

public class BuildingDTO {
    private Long id;

    private String name;

    private String address;

    private Set<HistoryRecordDTOChild> history;

    private double lastAbsoluteValue = -1;

    public BuildingDTO() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<HistoryRecordDTOChild> getHistory() {
        return history;
    }

    public void setHistory(Set<HistoryRecordDTOChild> history) {
        this.history = history;
    }

    public double getLastAbsoluteValue() {
        return lastAbsoluteValue;
    }

    public void setLastAbsoluteValue(double lastAbsoluteValue) {
        this.lastAbsoluteValue = lastAbsoluteValue;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BuildingDTO that = (BuildingDTO) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
