import lombok.Value;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class CsvReader {
    public static List<DeviceData> readSensorData(String filePath) throws Exception {
        List<DeviceData> dataList = new ArrayList<>();

        Properties properties = new Properties();
        properties.load(new FileInputStream("src/main/resources/sensor.properties"));
        String deviceId = properties.getProperty("device.id");

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            int deviceIdCounter = 1; // Generate synthetic device IDs
            while ((line = br.readLine()) != null) {
                // Trim and validate the line
                line = line.trim();
                if (line.isEmpty()) continue; // Skip empty lines

                try {
                    double measurementValue = Double.parseDouble(line);


                    // Generate synthetic timestamp and device ID

                    String timestamp = LocalDateTime.now().toString();

                    dataList.add(new DeviceData(deviceId, measurementValue, timestamp));
                } catch (NumberFormatException e) {
                    System.err.println("Invalid measurement value: " + line);
                }
            }
        }
        return dataList;
    }
}
