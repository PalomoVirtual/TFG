package com.ugr.monitorconsumo.dto;

import java.sql.Timestamp;
import java.util.Objects;

public class HistoryRecordDTOChild {
    private Long id;

    private Timestamp date;

    private double value;

    public HistoryRecordDTOChild() {

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HistoryRecordDTOChild that = (HistoryRecordDTOChild) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
