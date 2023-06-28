package com.ugr.monitorconsumo.repository;

import com.ugr.monitorconsumo.entity.Building;
import com.ugr.monitorconsumo.service.BuildingService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Building e SET e.notificationValue = :notificationValue, e.notificationEmail = :notificationEmail, e.notifications = :notifications WHERE e.id = :id")
    void actualizarNotificaciones(@Param("id") Long id, @Param("notificationValue") Double notificationValue, @Param("notificationEmail") String notificationEmail, @Param("notifications") boolean notifications);

    @Transactional
    @Modifying
    @Query("UPDATE Building e SET e.name = :name, e.address = :address, e.phoneNumber = :phoneNumber, e.additionalComment = :additionalComment WHERE e.id = :id")
    void actualizarRegularData(@Param("id") Long id, @Param("name") String name, @Param("address") String address, @Param("phoneNumber") String phoneNumber, @Param("additionalComment") String additionalComment);
}
