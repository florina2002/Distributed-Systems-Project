package com.example.consumer;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Setter
@Getter
public class DeviceData {
    // Getters and setters
    private String deviceId;
    private double measurementValue;
    private String timestamp;

}
