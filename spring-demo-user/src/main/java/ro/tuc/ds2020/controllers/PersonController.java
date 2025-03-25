package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.entities.Person;
import ro.tuc.ds2020.services.PersonService;

import java.util.List;

@CrossOrigin(origins = {"http://frontend.localhost", "http://localhost:3000","*"}) // Add specific frontend origins
@Controller
@RequestMapping("/users")
public class PersonController {
    @Value("#{T(java.net.InetAddress).getLocalHost().getHostName()}")
    private String replicaId;

    @Autowired
    PersonService personService;

    @RequestMapping(method = RequestMethod.GET, value = "/all")
    @ResponseBody
    ResponseEntity<List<Person>> findAll() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Replica-ID", replicaId);
        List<Person> personList = personService.getAllUsers();
        if (personList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

       // return new ResponseEntity<>(personList, HttpStatus.OK);
        return ResponseEntity.ok().headers(headers).body(personList);
    }

    // Register a new person
    @RequestMapping(method = RequestMethod.POST, value = "/register")
    @ResponseBody
    public ResponseEntity<Person> register(@RequestBody Person person) {
        Person newPerson = personService.addPerson(person);
        return new ResponseEntity<>(newPerson, HttpStatus.CREATED);
    }

    // Login with username and password
    @RequestMapping(method = RequestMethod.POST, value = "/login")
    @ResponseBody
    public ResponseEntity<Person> login(@RequestBody Person loginRequest) {
        Person person = personService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (person != null) {
            return new ResponseEntity<>(person, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(method = RequestMethod.POST, value = "/add")
    @ResponseBody
    public ResponseEntity<Person> addPerson(@RequestBody Person person) {
        Person newPerson = personService.addPerson(person);
        return new ResponseEntity<>(newPerson, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    @ResponseBody
    public ResponseEntity<Person> findPersonById(@PathVariable int id) {
        Person person = personService.getPersonById(id);
        if (person != null) {
            return new ResponseEntity<>(person, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/update/{id}")
    @ResponseBody
    public ResponseEntity<Person> updatePerson(@PathVariable int id, @RequestBody Person personDetails) {
        Person updatedPerson = personService.updatePerson(id, personDetails);
        if (updatedPerson != null) {
            return new ResponseEntity<>(updatedPerson, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(method = RequestMethod.DELETE, value = "/delete/{id}")
    @ResponseBody
    public ResponseEntity<Void> deletePerson(@PathVariable int id) {
        boolean isDeleted = personService.deletePerson(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // In PersonController

    @RequestMapping(method = RequestMethod.GET, value = "/role/{username}")
    @ResponseBody
    public ResponseEntity<String> getUserRole(@PathVariable String username) {
        Person person = personService.findPersonByUsername(username);
        if (person != null) {
            return new ResponseEntity<>(person.getRole().toString(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
