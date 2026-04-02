package com.example.todomanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.todomanager.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    
    
}
