package com.hackathon.studentplatform.service;

import com.hackathon.studentplatform.dto.CourseDTO;
import com.hackathon.studentplatform.dto.MaterialDTO;
import com.hackathon.studentplatform.dto.AssignmentDTO;
import com.hackathon.studentplatform.dto.ProgressResponse;
import com.hackathon.studentplatform.entity.Course;
import com.hackathon.studentplatform.entity.Material;
import com.hackathon.studentplatform.entity.Assignment;
import com.hackathon.studentplatform.entity.Submission;
import com.hackathon.studentplatform.repository.CourseRepository;
import com.hackathon.studentplatform.repository.MaterialRepository;
import com.hackathon.studentplatform.repository.AssignmentRepository;
import com.hackathon.studentplatform.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private MaterialRepository materialRepository;
    
    @Autowired
    private AssignmentRepository assignmentRepository;
    
    @Autowired
    private SubmissionRepository submissionRepository;
    
    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }
    
    public CourseDTO getCourseById(Long id) {
        Course course = courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        return toDTO(course);
    }
    
    public List<MaterialDTO> getMaterialsByCourseId(Long courseId) {
        return materialRepository.findByCourseId(courseId).stream()
            .map(this::toMaterialDTO)
            .collect(Collectors.toList());
    }
    
    public List<AssignmentDTO> getAssignmentsByCourseId(Long courseId) {
        return assignmentRepository.findByCourseId(courseId).stream()
            .map(this::toAssignmentDTO)
            .collect(Collectors.toList());
    }
    
    public ProgressResponse getProgress(Long courseId, Long studentId) {
        List<Assignment> assignments = assignmentRepository.findByCourseId(courseId);
        if (assignments.isEmpty()) {
            return new ProgressResponse(0);
        }
        
        long completedCount = assignments.stream()
            .mapToLong(assignment -> {
                List<Submission> submissions = submissionRepository.findByAssignmentIdAndStudentId(
                    assignment.getId(), studentId);
                return submissions.stream().anyMatch(s -> s.getStatus().equals("GRADED")) ? 1 : 0;
            })
            .sum();
        
        int progress = (int) ((completedCount * 100) / assignments.size());
        return new ProgressResponse(progress);
    }
    
    private CourseDTO toDTO(Course course) {
        return new CourseDTO(
            course.getId(),
            course.getTitle(),
            course.getDescription(),
            course.getCreatedAt()
        );
    }
    
    private MaterialDTO toMaterialDTO(Material material) {
        return new MaterialDTO(
            material.getId(),
            material.getTitle(),
            material.getDescription(),
            material.getType(),
            material.getFileUrl(),
            material.getCreatedAt()
        );
    }
    
    private AssignmentDTO toAssignmentDTO(Assignment assignment) {
        return new AssignmentDTO(
            assignment.getId(),
            assignment.getCourse().getId(),
            assignment.getTitle(),
            assignment.getDescription(),
            assignment.getDueDate(),
            assignment.getCreatedAt()
        );
    }
}


