package com.example.todomanager.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.todomanager.enums.TodoPriority;
import com.example.todomanager.enums.TodoStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;
    
    @Enumerated(EnumType.STRING)
    private TodoStatus status;

    @Enumerated(EnumType.STRING)
    private TodoPriority priority;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
