package com.example.todomanager.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;
import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.todomanager.entity.Todo;
import com.example.todomanager.enums.TodoPriority;
import com.example.todomanager.enums.TodoStatus;
import com.example.todomanager.repository.TodoRepository;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    @Test
    void testCreateTodo() {
        Todo todo = new Todo();
        todo.setTitle("学習");
        todo.setDescription("学習");
        todo.setStatus(TodoStatus.PENDING);
        todo.setPriority(TodoPriority.HIGH);
        todo.setDueDate(LocalDate.of(2025,10,15));
        
        when(todoRepository.save(any(Todo.class))).thenReturn(todo);

        Todo result = todoService.createTodo(todo);

        assertThat(result.getTitle()).isEqualTo("学習");
        assertThat(result.getDescription()).isEqualTo("学習");
        assertThat(result.getStatus()).isEqualTo(TodoStatus.PENDING);
        assertThat(result.getPriority()).isEqualTo(TodoPriority.HIGH);
        assertThat(result.getDueDate()).isEqualTo(LocalDate.of(2025,10,15));

        verify(todoRepository).save(todo);
    }
    
}
