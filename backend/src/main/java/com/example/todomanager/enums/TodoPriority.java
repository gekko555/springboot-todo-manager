package com.example.todomanager.enums;

public enum TodoPriority {
    
    HIGH("高"),
    MEDIUM("中"),
    LOW("低");

    private final String priorityLabel;

    TodoPriority(String priorityLabel){
        this.priorityLabel = priorityLabel;
    }

    public String getPriorityLabel(){
        return priorityLabel;
    }
}
