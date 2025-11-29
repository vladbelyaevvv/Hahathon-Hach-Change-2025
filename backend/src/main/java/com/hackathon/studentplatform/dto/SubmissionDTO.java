package com.hackathon.studentplatform.dto;

import java.time.LocalDateTime;

public class SubmissionDTO {
    private Long id;
    private Long assignmentId;
    private Integer version;
    private String fileName;
    private String filePath;
    private String status;
    private String teacherComment;
    private Integer grade;
    private LocalDateTime submittedAt;
    private LocalDateTime reviewedAt;
    
    public SubmissionDTO() {}
    
    public SubmissionDTO(Long id, Long assignmentId, Integer version, String fileName, String filePath,
                         String status, String teacherComment, Integer grade,
                         LocalDateTime submittedAt, LocalDateTime reviewedAt) {
        this.id = id;
        this.assignmentId = assignmentId;
        this.version = version;
        this.fileName = fileName;
        this.filePath = filePath;
        this.status = status;
        this.teacherComment = teacherComment;
        this.grade = grade;
        this.submittedAt = submittedAt;
        this.reviewedAt = reviewedAt;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getAssignmentId() {
        return assignmentId;
    }
    
    public void setAssignmentId(Long assignmentId) {
        this.assignmentId = assignmentId;
    }
    
    public Integer getVersion() {
        return version;
    }
    
    public void setVersion(Integer version) {
        this.version = version;
    }
    
    public String getFileName() {
        return fileName;
    }
    
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    
    public String getFilePath() {
        return filePath;
    }
    
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getTeacherComment() {
        return teacherComment;
    }
    
    public void setTeacherComment(String teacherComment) {
        this.teacherComment = teacherComment;
    }
    
    public Integer getGrade() {
        return grade;
    }
    
    public void setGrade(Integer grade) {
        this.grade = grade;
    }
    
    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }
    
    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }
    
    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }
    
    public void setReviewedAt(LocalDateTime reviewedAt) {
        this.reviewedAt = reviewedAt;
    }
}


