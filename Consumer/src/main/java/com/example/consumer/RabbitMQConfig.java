package com.example.consumer;

import com.rabbitmq.client.ConnectionFactory;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.print.attribute.URISyntax;
import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

@Configuration
public class RabbitMQConfig {

    @Bean
    public ConnectionFactory connectionFactory() throws URISyntaxException, NoSuchAlgorithmException, KeyManagementException {
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setUri("amqps://frivxwce:iWwADRrEaArOAGYe04unj1W7Aza0561I@woodpecker.rmq.cloudamqp.com/frivxwce");
        return connectionFactory;
    }

}
