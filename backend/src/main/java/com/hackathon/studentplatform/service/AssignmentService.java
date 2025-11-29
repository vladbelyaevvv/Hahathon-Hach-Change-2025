package com.hackathon.studentplatform.service;

import com.hackathon.studentplatform.dto.AssignmentDTO;
import com.hackathon.studentplatform.dto.SubmissionDTO;
import com.hackathon.studentplatform.entity.Assignment;
import com.hackathon.studentplatform.entity.Submission;
import com.hackathon.studentplatform.entity.User;
import com.hackathon.studentplatform.repository.AssignmentRepository;
import com.hackathon.studentplatform.repository.SubmissionRepository;
import com.hackathon.studentplatform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;
    
    @Autowired
    private SubmissionRepository submissionRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Value("${app.upload.dir:uploads}")
    private String uploadDir;
    
    public AssignmentDTO getAssignmentById(Long id) {
        Assignment assignment = assignmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Assignment not found"));
        return toDTO(assignment);
    }
    
    public List<SubmissionDTO> getSubmissions(Long assignmentId, Long studentId) {
        return submissionRepository.findByAssignmentIdAndStudentId(assignmentId, studentId).stream()
            .map(this::toSubmissionDTO)
            .collect(Collectors.toList());
    }
    
    public SubmissionDTO submitAssignment(Long assignmentId, Long studentId, MultipartFile file) throws IOException {
        Assignment assignment = assignmentRepository.findById(assignmentId)
            .orElseThrow(() -> new RuntimeException("Assignment not found"));
        
        User student = userRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        
        // Get next version
        Integer nextVersion = submissionRepository
            .findFirstByAssignmentIdAndStudentIdOrderByVersionDesc(assignmentId, studentId)
            .map(s -> s.getVersion() + 1)
            .orElse(1);
        
        // Save file
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // Create submission
        Submission submission = new Submission();
        submission.setAssignment(assignment);
        submission.setStudent(student);
        submission.setVersion(nextVersion);
        submission.setFilePath(filePath.toString());
        submission.setFileName(file.getOriginalFilename());
        submission.setStatus("SENT");
        
        submission = submissionRepository.save(submission);
        return toSubmissionDTO(submission);
    }
    
    private AssignmentDTO toDTO(Assignment assignment) {
        return new AssignmentDTO(
            assignment.getId(),
            assignment.getCourse().getId(),
            assignment.getTitle(),
            assignment.getDescription(),
            assignment.getDueDate(),
            assignment.getCreatedAt()
        );
    }
    
    private SubmissionDTO toSubmissionDTO(Submission submission) {
        return new SubmissionDTO(
            submission.getId(),
            submission.getAssignment().getId(),
            submission.getVersion(),
            submission.getFileName(),
            submission.getFilePath(),
            submission.getStatus(),
            submission.getTeacherComment(),
            submission.getGrade(),
            submission.getSubmittedAt(),
            submission.getReviewedAt()
        );
    }
}


