package com.example.consumer;

import com.example.consumer.EnergyConsumption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEnergyConsumptionRepository extends JpaRepository<EnergyConsumption, Long> {
}
