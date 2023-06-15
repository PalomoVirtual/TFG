package com.ugr.monitorconsumo.entity;

import jakarta.persistence.*;

import java.util.Objects;
import java.util.Set;

@Entity
@Table
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    @OneToMany(mappedBy="building")
    private Set<HistoryRecord> history;

    private double lastAbsoluteValue = -1;

    public Building() {

    }

    public Building(String name, String address, Set<HistoryRecord> history, double lastAbsoluteValue) {
        this.name = name;
        this.address = address;
        this.history = history;
        this.lastAbsoluteValue = lastAbsoluteValue;
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

    public Set<HistoryRecord> getHistory() {
        return history;
    }

    public void setHistory(Set<HistoryRecord> history) {
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
        Building building = (Building) o;
        return Objects.equals(getId(), building.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
