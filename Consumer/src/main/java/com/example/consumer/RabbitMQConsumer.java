package com.example.consumer;

import com.example.consumer.EnergyConsumption;
import com.example.consumer.IEnergyConsumptionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rabbitmq.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

@Component
public class RabbitMQConsumer {

    private final static String QUEUE_NAME = "demoqueue";

    @Autowired
    private ConnectionFactory connectionFactory;

    @Autowired
    private IEnergyConsumptionRepository repository;

    @PostConstruct
    public void startConsuming() throws Exception {
        try (Connection connection = connectionFactory.newConnection();
             Channel channel = connection.createChannel()) {

            // Declare the queue to ensure it exists
            channel.queueDeclare(QUEUE_NAME, true, false, false, null);
            System.out.println("Waiting for messages...");

            // Fetch messages manually at 1-second intervals
            while (true) {
                // Fetch a single message from the queue
                GetResponse response = channel.basicGet(QUEUE_NAME, true);
                if (response != null) {
                    String message = new String(response.getBody(), "UTF-8");
                    System.out.println("Received message: " + message);

                    ObjectMapper mapper = new ObjectMapper();
                    try {
                        // Parse the message into a DeviceData object
                        DeviceData deviceData = mapper.readValue(message, DeviceData.class);
                        System.out.println("Parsed Device Data:");
                        System.out.println("  Device ID: " + deviceData.getDeviceId());
                        System.out.println("  Measurement Value: " + deviceData.getMeasurementValue());
                        System.out.println("  Timestamp: " + deviceData.getTimestamp());

                        // Save to database
                        EnergyConsumption consumption = new EnergyConsumption();
                        consumption.setDeviceId(deviceData.getDeviceId());
                        consumption.setConsumption(deviceData.getMeasurementValue());
                        consumption.setTimestamp(LocalDateTime.parse(deviceData.getTimestamp()));
                        repository.save(consumption);
                    } catch (Exception e) {
                        System.err.println("Error processing message:");
                        e.printStackTrace();
                    }
                } else {
                    System.out.println("No messages in the queue.");
                }

                // Wait for 1 second before fetching the next message
                Thread.sleep(1000);
            }

        } catch (Exception e) {
            System.err.println("Error occurred:");
            e.printStackTrace();
 }
}
}

