package ro.tuc.ds2020.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.entities.Person;
import ro.tuc.ds2020.repositories.IPersonRepository;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private IPersonRepository personRepository;

    // Get all users
    public List<Person> getAllUsers() {
        return personRepository.findAll();
    }

    // Add new person (REGISTER)
    public Person addPerson(Person person) {
        return personRepository.save(person);
    }

    // Get person by ID
    public Person getPersonById(int id) {
        return personRepository.findById(id).orElse(null);
    }

    // Login logic (without password hashing)
    public Person login(String username, String password) {
        List<Person> users = personRepository.findAll();
        return users.stream()
                .filter(user -> user.getUsername().equals(username) && user.getPassword().equals(password))
                .findFirst()
                .orElse(null); // Return null if credentials don't match
    }

    // Update person
    public Person updatePerson(int id, Person personDetails) {
        // Check if the person exists by ID
        return personRepository.findById(id).map(person -> {
            // Update person details
            person.setUsername(personDetails.getUsername());
            person.setPassword(personDetails.getPassword());
            person.setRole(personDetails.getRole());
            // Save updated person to the database
            return personRepository.save(person);
        }).orElse(null); // Return null if person with given ID doesn't exist
    }

    // Delete person
    public boolean deletePerson(int id) {
        if (personRepository.existsById(id)) {
            personRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Get person by username
    public Person findPersonByUsername(String username) {
        return personRepository.findByUsername(username);
    }

}
