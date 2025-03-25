package com.example.consumer;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table
public class EnergyConsumption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String deviceId;

    @Column(nullable = false)
    private double consumption;

    @Column(nullable = false)
    private LocalDateTime timestamp;
}
