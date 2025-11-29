package com.hackathon.studentplatform.dto;

public class LoginResponse {
    private Long userId;
    private String email;
    private String fullName;
    private String role;
    private String token; // Simple token for hackathon
    
    public LoginResponse() {}
    
    public LoginResponse(Long userId, String email, String fullName, String role, String token) {
        this.userId = userId;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.token = token;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
}


