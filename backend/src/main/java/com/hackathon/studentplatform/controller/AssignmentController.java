package com.hackathon.studentplatform.controller;

import com.hackathon.studentplatform.dto.AssignmentDTO;
import com.hackathon.studentplatform.dto.SubmissionDTO;
import com.hackathon.studentplatform.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "*")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;
    
    @GetMapping("/{assignmentId}")
    public ResponseEntity<AssignmentDTO> getAssignment(@PathVariable Long assignmentId) {
        try {
            return ResponseEntity.ok(assignmentService.getAssignmentById(assignmentId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{assignmentId}/submissions")
    public ResponseEntity<List<SubmissionDTO>> getSubmissions(
            @PathVariable Long assignmentId,
            @RequestParam(defaultValue = "1") Long studentId) {
        return ResponseEntity.ok(assignmentService.getSubmissions(assignmentId, studentId));
    }
    
    @PostMapping("/{assignmentId}/submit")
    public ResponseEntity<SubmissionDTO> submitAssignment(
            @PathVariable Long assignmentId,
            @RequestParam(defaultValue = "1") Long studentId,
            @RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            SubmissionDTO submission = assignmentService.submitAssignment(assignmentId, studentId, file);
            return ResponseEntity.ok(submission);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}


