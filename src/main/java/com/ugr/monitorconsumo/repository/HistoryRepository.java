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

    List<HistoryRecord> findByBuildingIdAndDateBetweenOrderByDateAsc(Long buildingId, Timestamp dateInicial, Timestamp dateFinal);

    List<HistoryRecord> findByBuildingIdAndValueGreaterThanEqualOrderByDateAsc(Long buildingId, Double consumoInicial);

    List<HistoryRecord> findByBuildingIdAndValueLessThanEqualOrderByDateAsc(Long buildingId, Double consumoFinal);

    List<HistoryRecord> findByBuildingIdAndValueBetweenOrderByDateAsc(Long buildingId, Double consumoInicial, Double consumoFinal);

    List<HistoryRecord> findByBuildingIdAndDateBetweenAndValueGreaterThanEqualOrderByDateAsc(Long buildingId, Timestamp dateInicial, Timestamp dateFinal, Double consumoInicial);

    List<HistoryRecord> findByBuildingIdAndDateBetweenAndValueLessThanEqualOrderByDateAsc(Long buildingId, Timestamp dateInicial, Timestamp dateFinal, Double consumoFinal);

    List<HistoryRecord> findByBuildingIdAndDateBetweenAndValueBetweenOrderByDateAsc(Long buildingId, Timestamp dateInicial, Timestamp dateFinal, Double consumoInicial, Double consumoFinal);

    @Query(value = "SELECT * FROM HISTORY_RECORD h WHERE h.building_id = :buildingId ORDER BY h.date DESC LIMIT 2", nativeQuery = true)
    List<HistoryRecord> findTop2ByBuildingIdOrderByDateDesc(@Param("buildingId") Long buildingId);

    @Query(value = "SELECT MIN(h.value) FROM HISTORY_RECORD h WHERE h.building_id = :buildingId", nativeQuery = true)
    Double findMinByBuildingId(@Param("buildingId") Long buildingId);

    @Query(value = "SELECT MAX(h.value) FROM HISTORY_RECORD h WHERE h.building_id = :buildingId", nativeQuery = true)
    Double findMaxByBuildingId(@Param("buildingId") Long buildingId);
}
