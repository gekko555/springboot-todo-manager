package com.example.todomanager.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.todomanager.enums.TodoPriority;
import com.example.todomanager.enums.TodoStatus;

public class TodoDisplayDto {
    
    //NO
    private Long id;

    //タスク名
    private String title;
    
    //説明
    private String description;
    
    //期限
    private LocalDate dueDate;

    //ステータス
    private TodoStatus status;

    //優先度
    private TodoPriority priority;

    //作成日時
    private LocalDateTime createdAt;

    //更新日時
    private LocalDateTime updatedAt;

    public TodoDisplayDto() {
    }

    public TodoDisplayDto(Long id, String title, String description, LocalDate dueDate, TodoStatus status, TodoPriority priority, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public LocalDate getDueDate(){
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate){
        this.dueDate = dueDate;
    }

    public TodoStatus getStatus(){
        return status;
    }

    public void setStatus(TodoStatus status){
        this.status = status;
    }

    public TodoPriority getPriority(){
        return priority;
    }

    public void setPriority(TodoPriority priority){
        this.priority = priority;
    }

    public LocalDateTime getCreatedAt(){
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt){
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt(){
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt){
        this.updatedAt = updatedAt;
    }
    
    
}
