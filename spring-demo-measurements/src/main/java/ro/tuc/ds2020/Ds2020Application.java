package ro.tuc.ds2020;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.validation.annotation.Validated;
import ro.tuc.ds2020.webSockets.WebSocketsController;

import java.util.TimeZone;

@SpringBootApplication
public class Ds2020Application extends SpringBootServletInitializer {
    public static void main(String[] args)  {
        SpringApplication.run(Ds2020Application.class, args);
    }

    @Autowired
    WebSocketsController webSocketController;

    @RabbitListener(queues = "demoqueue")
    public void listenQueueMeasurements(String message1) throws JsonProcessingException, InterruptedException {
        String msg = new ObjectMapper().readValue(message1, String.class);
        System.out.println("Received message: " + msg);

        for (int i = 0; i < 100; i++) {
            webSocketController.sendMessage("test" + i + "\n");
            System.out.println("Received message: " + msg);

            Thread.sleep(2000);
        }




    }


}
