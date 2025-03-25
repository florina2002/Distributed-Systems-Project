package ro.tuc.ds2020.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.repositories.IDeviceRepository;
import ro.tuc.ds2020.entities.Device;

import javax.persistence.TypedQuery;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeviceService {

    @Autowired
    private IDeviceRepository deviceRepository;

    // Get all devices
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    // Add new device
    public Device addDevice(Device device) {
        return deviceRepository.save(device);
    }

    // Get device by ID
    public Device getDeviceById(int id) {
        return deviceRepository.findById(id).orElse(null);
    }

    // Update device
    public Device updateDevice(int id, Device deviceDetails) {
        // Check if the device exists by ID
        return deviceRepository.findById(id).map(device -> {
            // Update device details
            device.setDescription(deviceDetails.getDescription());
            device.setAddress(deviceDetails.getAddress());
            device.setMaxEnergyConsumption(deviceDetails.getMaxEnergyConsumption());
            device.setPersonId(deviceDetails.getPersonId());

            // Save updated device to the database
            return deviceRepository.save(device);
        }).orElse(null); // Return null if device with given ID doesn't exist
    }

    // Delete device
    public boolean deleteDevice(int id) {
        if (deviceRepository.existsById(id)) {
            deviceRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Get all devices and filter by personId (without modifying the repository)
    public List<Device> getDevicesByPersonId(int personId) {
        // Fetch all devices and filter by personId
        return deviceRepository.findAll().stream()
                .filter(device -> device.getPersonId() == personId)
                .collect(Collectors.toList());
    }

    // Delete all devices by personId
    public void deleteDevicesByPersonId(int personId) {
        List<Device> devices = getDevicesByPersonId(personId);
        for (Device device : devices) {
            deleteDevice(device.getId());
        }
    }
}
