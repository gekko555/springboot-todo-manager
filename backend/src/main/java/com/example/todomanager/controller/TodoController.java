package com.example.todomanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todomanager.dto.TodoDisplayDto;
import com.example.todomanager.entity.Todo;
import com.example.todomanager.service.TodoService;

@CrossOrigin(origins = "http://localhost:5173")
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

    @PostMapping
    public ResponseEntity<TodoDisplayDto> createTodo(@RequestBody Todo todo){
        Todo createdTodo = todoService.createTodo(todo);
        TodoDisplayDto dto = todoService.convertToDto(createdTodo);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo (@PathVariable Long id){
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }
    
}
