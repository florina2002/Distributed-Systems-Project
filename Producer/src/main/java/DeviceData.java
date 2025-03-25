// Helper class to construct message data
class DeviceData {
    private String deviceId;
    private double measurementValue;
    private String timestamp;

    public DeviceData(String deviceId, double measurementValue, String timestamp) {
        this.deviceId = deviceId;
        this.measurementValue = measurementValue;
        this.timestamp = timestamp;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public double getMeasurementValue() {
        return measurementValue;
    }

    public void setMeasurementValue(double measurementValue) {
        this.measurementValue = measurementValue;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}