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

    @Column(nullable = false)
    private String name = "";

    @Column(columnDefinition = "VARCHAR(255) DEFAULT ''")
    private String address = "";

    @Column(columnDefinition = "VARCHAR(255) DEFAULT ''")
    private String phoneNumber = "";

    @Column(columnDefinition = "VARCHAR(500) DEFAULT ''")
    private String additionalComment = "";

    @OneToMany(mappedBy="building")
    private Set<HistoryRecord> history;

    private double lastAbsoluteValue = -1;

    private boolean notifications = false;

    private Double notificationValue = null;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT ''")
    private String notificationEmail = "";

    public Building() {
        setAddress("");
        setPhoneNumber("");
        setAdditionalComment("");
        setNotificationEmail("");
    }

    public Building(String name, String address, Set<HistoryRecord> history, double lastAbsoluteValue) {
        this.name = name;
        this.address = address;
        this.history = history;
        this.lastAbsoluteValue = lastAbsoluteValue;
    }

    public Building(String name, String address, String phoneNumber, String additionalComment, Set<HistoryRecord> history, double lastAbsoluteValue, boolean notifications, double notificationValue, String notificationEmail) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.additionalComment = additionalComment;
        this.history = history;
        this.lastAbsoluteValue = lastAbsoluteValue;
        this.notifications = notifications;
        this.notificationValue = notificationValue;
        this.notificationEmail = notificationEmail;
    }

    @PrePersist
    @PreUpdate
    private void prePersistAndUpdate() {
        if (address == null) {
            address = "";
        }
        if (phoneNumber == null) {
            phoneNumber = "";
        }
        if (additionalComment == null) {
            additionalComment = "";
        }
        if (notificationEmail == null) {
            notificationEmail = "";
        }
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAdditionalComment() {
        return additionalComment;
    }

    public void setAdditionalComment(String additionalComment) {
        this.additionalComment = additionalComment;
    }

    public boolean isNotifications() {
        return notifications;
    }

    public void setNotifications(boolean notifications) {
        this.notifications = notifications;
    }

    public double getNotificationValue() {
        return notificationValue;
    }

    public void setNotificationValue(double notificationValue) {
        this.notificationValue = notificationValue;
    }

    public String getNotificationEmail() {
        return notificationEmail;
    }

    public void setNotificationEmail(String notificationEmail) {
        this.notificationEmail = notificationEmail;
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
