package com.hackathon.studentplatform.service;

import com.hackathon.studentplatform.dto.LoginRequest;
import com.hackathon.studentplatform.dto.LoginResponse;
import com.hackathon.studentplatform.entity.User;
import com.hackathon.studentplatform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    
    public LoginResponse login(LoginRequest request) {
        // For hackathon: simple password check (in production, use proper hashing)
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        
        // Simple password check (in production, compare hashed passwords)
        if (!user.getPasswordHash().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        // Generate simple token
        String token = UUID.randomUUID().toString();
        
        return new LoginResponse(
            user.getId(),
            user.getEmail(),
            user.getFullName(),
            user.getRole(),
            token
        );
    }
}


