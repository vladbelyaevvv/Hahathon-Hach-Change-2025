package com.hackathon.studentplatform.dto;

public class ProgressResponse {
    private Integer progress; // 0-100
    
    public ProgressResponse() {}
    
    public ProgressResponse(Integer progress) {
        this.progress = progress;
    }
    
    public Integer getProgress() {
        return progress;
    }
    
    public void setProgress(Integer progress) {
        this.progress = progress;
    }
}


