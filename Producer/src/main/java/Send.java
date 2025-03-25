import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.nio.charset.StandardCharsets;
import java.util.List;

public class Send {

    private final static String QUEUE_NAME = "demoqueue";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri("amqps://frivxwce:iWwADRrEaArOAGYe04unj1W7Aza0561I@woodpecker.rmq.cloudamqp.com/frivxwce");

        // Path to sensor.csv
        String filePath = "C:\\Users\\Florina\\Desktop\\FACULTATE\\DS\\DS2024_30444_Nechita_Florina_Elena_Assignment_1\\sensor.csv";

        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {

            // Declare the queue
            channel.queueDeclare(QUEUE_NAME, true, false, false, null);

            // Read sensor data from CSV
            List<DeviceData> dataList = CsvReader.readSensorData(filePath);

            for (DeviceData data : dataList) {
                // Convert the DeviceData object to JSON
                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                String json = ow.writeValueAsString(data);

                // Send message to RabbitMQ
                channel.basicPublish("", QUEUE_NAME, null, json.getBytes(StandardCharsets.UTF_8));
                System.out.println("Message sent: " + json);

                // Optional: Add a delay for testing
                Thread.sleep(10000);
            }
        }
    }
}



