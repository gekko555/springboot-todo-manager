package com.example.todomanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todomanager.dto.TodoDisplayDto;
import com.example.todomanager.service.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<TodoDisplayDto>> getAllTodos(){
        List<TodoDisplayDto> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);

    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoDisplayDto> getTodoById(@PathVariable Long id){
        TodoDisplayDto todo = todoService.getTodoDetail(id);
        return todo != null ? ResponseEntity.ok(todo) : ResponseEntity.notFound().build();
    }
    
}
