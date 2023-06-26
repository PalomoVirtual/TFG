package com.ugr.monitorconsumo.repository;

import com.ugr.monitorconsumo.entity.HistoryRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryRecord, Long> {
    List<HistoryRecord> findAllByBuildingIdOrderByDateAsc(Long buildingId);

    List<HistoryRecord> findByBuildingIdAndDateAfterOrderByDateAsc(Long buildingId, Timestamp date);

    @Query(value = "SELECT * FROM HISTORY_RECORD h WHERE h.building_id = :buildingId ORDER BY h.date DESC LIMIT 2", nativeQuery = true)
    List<HistoryRecord> findTop2ByBuildingIdOrderByDateDesc(@Param("buildingId") Long buildingId);
}
