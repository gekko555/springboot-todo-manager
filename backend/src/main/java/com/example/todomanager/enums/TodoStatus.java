package com.example.todomanager.enums;

public enum TodoStatus {
    
    PENDING("未完了"),
    IN_PROGRESS("進行中"),
    ON_HOLD("一時保留"),
    COMPLETED("完了");

    private final String japaneseName;

    TodoStatus(String japaneseName){
        this.japaneseName = japaneseName;
    }

    public String getJapaneseName(){
        return japaneseName;
    }
}
