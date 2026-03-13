package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    // CREATE
    @PostMapping
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    // READ ALL
    @GetMapping
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable int id){
        return userRepository.findById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User userDetails){

        User user = userRepository.findById(id).orElseThrow();

        user.setUserId(userDetails.getUserId());
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());

        return userRepository.save(user);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
        return "User deleted";
    }
}