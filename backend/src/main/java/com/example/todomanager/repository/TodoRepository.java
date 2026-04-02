package com.example.todomanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.todomanager.entity.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long>{

}
