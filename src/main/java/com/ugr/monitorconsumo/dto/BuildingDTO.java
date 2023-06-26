package com.ugr.monitorconsumo.dto;

import java.util.Objects;
import java.util.Set;

public class BuildingDTO {
    private Long id;

    private String name;

    private String address;

    private String phoneNumber;

    private String additionalComment;

    //private Set<HistoryRecordDTOChild> history;

    private double lastAbsoluteValue = -1;

    private boolean notifications;

    private double notificationValue;

    private String notificationEmail;

    public BuildingDTO() {

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

//    public Set<HistoryRecordDTOChild> getHistory() {
//        return history;
//    }
//
//    public void setHistory(Set<HistoryRecordDTOChild> history) {
//        this.history = history;
//    }

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
