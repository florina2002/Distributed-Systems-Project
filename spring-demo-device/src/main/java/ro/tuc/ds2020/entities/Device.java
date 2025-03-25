package ro.tuc.ds2020.entities;

import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Device {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @Column(nullable = false)
        private String description;

        @Column(nullable = false)
        private String address;

        @Column(nullable = false)
        private String maxEnergyConsumption;

        @Column(nullable = false)
        private int personId;
}
