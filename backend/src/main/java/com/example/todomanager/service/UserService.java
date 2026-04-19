package com.example.todomanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todomanager.entity.User;
import com.example.todomanager.repository.UserRepository;

import lombok.NonNull;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(@NonNull User user) {
        return userRepository.save(user);
    }

    public User findUserById(@NonNull Long id) {
        return userRepository.findById(id).orElse(null);
    }
    
}
