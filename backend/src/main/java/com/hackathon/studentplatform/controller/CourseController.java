package com.hackathon.studentplatform.controller;

import com.hackathon.studentplatform.dto.CourseDTO;
import com.hackathon.studentplatform.dto.MaterialDTO;
import com.hackathon.studentplatform.dto.AssignmentDTO;
import com.hackathon.studentplatform.dto.ProgressResponse;
import com.hackathon.studentplatform.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {
    @Autowired
    private CourseService courseService;
    
    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }
    
    @GetMapping("/{courseId}")
    public ResponseEntity<CourseDTO> getCourse(@PathVariable Long courseId) {
        try {
            return ResponseEntity.ok(courseService.getCourseById(courseId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{courseId}/materials")
    public ResponseEntity<List<MaterialDTO>> getMaterials(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getMaterialsByCourseId(courseId));
    }
    
    @GetMapping("/{courseId}/assignments")
    public ResponseEntity<List<AssignmentDTO>> getAssignments(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getAssignmentsByCourseId(courseId));
    }
    
    @GetMapping("/{courseId}/progress")
    public ResponseEntity<ProgressResponse> getProgress(
            @PathVariable Long courseId,
            @RequestParam(defaultValue = "1") Long studentId) {
        return ResponseEntity.ok(courseService.getProgress(courseId, studentId));
    }
}


