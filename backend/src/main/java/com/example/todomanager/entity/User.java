package com.example.todomanager.entity;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    @NotBlank(message = "ユーザー名は必須です")
    @Size(min = 3, max = 50, message = "ユーザー名は3〜50文字で入力してください")
    private String username;
    
    @Column(nullable = false)
    @NotBlank(message = "パスワードは必須です")
    @Size(min = 6, message = "パスワードは６文字以上で入力してください")
    private String password;
    
    @Column(unique = true, nullable = false)
    @NotBlank(message = "メールアドレスは必須です")
    @Email(message = "正しいメールアドレスw")
    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    
    // Getters and Setters
}
