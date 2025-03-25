package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.services.DeviceService;
import org.springframework.http.ResponseEntity;
import ro.tuc.ds2020.entities.Device;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/devices")
public class DeviceController {
    @Autowired
    DeviceService deviceService;

    @RequestMapping(method = RequestMethod.GET, value = "/all")
    @ResponseBody
    ResponseEntity<List<Device>> findAll() {
        List<Device> deviceList = deviceService.getAllDevices();
        if (deviceList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(deviceList, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/add")
    @ResponseBody
    public ResponseEntity<Device> addDevice(@RequestBody Device device) {
        Device newDevice = deviceService.addDevice(device);
        return new ResponseEntity<>(newDevice, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    @ResponseBody
    public ResponseEntity<Device> findDeviceById(@PathVariable int id) {
        Device device = deviceService.getDeviceById(id);
        if (device != null) {
            return new ResponseEntity<>(device, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/update/{id}")
    @ResponseBody
    public ResponseEntity<Device> updateDevice(@PathVariable int id, @RequestBody Device deviceDetails) {
        Device updatedDevice = deviceService.updateDevice(id, deviceDetails);
        if (updatedDevice != null) {
            return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/delete/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteDevice(@PathVariable int id) {
        if (deviceService.deleteDevice(id)) {
            return new ResponseEntity<>("Device deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Device not found", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/person/{personId}")
    @ResponseBody
    public ResponseEntity<List<Device>> findDevicesByPersonId(@PathVariable int personId) {
        List<Device> deviceList = deviceService.getDevicesByPersonId(personId);
        if (deviceList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(deviceList, HttpStatus.OK);
    }

    // New endpoint to delete devices by personId
    @RequestMapping(method = RequestMethod.DELETE, value = "/delete-by-personId/{personId}")
    @ResponseBody
    public ResponseEntity<String> deleteDevicesByPersonId(@PathVariable int personId) {
        deviceService.deleteDevicesByPersonId(personId);
        return new ResponseEntity<>("Devices deleted successfully for person ID: " + personId, HttpStatus.OK);
    }
}
