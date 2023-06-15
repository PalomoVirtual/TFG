package com.ugr.monitorconsumo.repository;

import com.ugr.monitorconsumo.entity.Building;
import com.ugr.monitorconsumo.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {

}
