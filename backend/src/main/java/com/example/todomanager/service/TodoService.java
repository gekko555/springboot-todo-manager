package com.example.todomanager.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todomanager.dto.TodoDisplayDto;
import com.example.todomanager.entity.Todo;
import com.example.todomanager.repository.TodoRepository;

import lombok.NonNull;


@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    //インサート用
    public Todo createTodo(@NonNull Todo todo) {
        return todoRepository.save(todo);
    }

    //一件ずつの取得
    public Todo getTodoById(@NonNull Long id) {
        return todoRepository.findById(id).orElse(null);
    }

    //全件取得
    public List<TodoDisplayDto> getAllTodos(){
        //引数なし理由は:全権取得のため
        List<Todo> todos = todoRepository.findAll();

        List<TodoDisplayDto> dtos = new ArrayList<>();
        for(Todo todo : todos){
            TodoDisplayDto dto = convertToDto(todo);
            dtos.add(dto);
        }
        return dtos;
    }

    //詳細用
    public TodoDisplayDto getTodoDetail(@NonNull Long id){
        Todo todo = todoRepository.findById(id).orElse(null);
        return convertToDto(todo);
    }

    //TodoエンティティをTodoDisplayDtoに変換
    public TodoDisplayDto convertToDto(Todo todo){
        TodoDisplayDto dto = new TodoDisplayDto();
        dto.setId(todo.getId());
        dto.setTitle(todo.getTitle());
        dto.setDescription(todo.getDescription());
        dto.setDueDate(todo.getDueDate());
        dto.setStatus(todo.getStatus());
        dto.setPriority(todo.getPriority());
        dto.setCreatedAt(todo.getCreatedAt());
        dto.setUpdatedAt(todo.getUpdatedAt());

        return dto;

    }

    public void deleteTodo(@NonNull Long id){
        todoRepository.deleteById(id);
    }
    
}
