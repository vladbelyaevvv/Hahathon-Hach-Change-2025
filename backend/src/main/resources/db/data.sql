-- Seed data for Student Platform

-- Insert a demo student user
INSERT INTO users (email, password_hash, role, full_name) VALUES
('student@example.com', 'password123', 'STUDENT', 'John Student')
ON CONFLICT (email) DO NOTHING;

-- Insert courses (using DO block to avoid duplicates)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM courses WHERE title = 'Introduction to Web Development') THEN
        INSERT INTO courses (title, description) VALUES
        ('Introduction to Web Development', 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM courses WHERE title = 'Advanced Java Programming') THEN
        INSERT INTO courses (title, description) VALUES
        ('Advanced Java Programming', 'Deep dive into Java programming with Spring Boot framework and best practices.');
    END IF;
END $$;

-- Insert materials for course 1
INSERT INTO materials (course_id, title, description, type, file_url)
SELECT 1, 'HTML Basics Video', 'Introduction to HTML structure and tags', 'VIDEO', 'https://www.youtube.com/watch?v=example1'
WHERE NOT EXISTS (SELECT 1 FROM materials WHERE course_id = 1 AND title = 'HTML Basics Video');

INSERT INTO materials (course_id, title, description, type, file_url)
SELECT 1, 'CSS Fundamentals', 'Learn CSS styling and layout techniques', 'TEXT', 'https://example.com/css-guide.pdf'
WHERE NOT EXISTS (SELECT 1 FROM materials WHERE course_id = 1 AND title = 'CSS Fundamentals');

INSERT INTO materials (course_id, title, description, type, file_url)
SELECT 1, 'JavaScript Cheat Sheet', 'Quick reference for JavaScript syntax', 'FILE', '/files/js-cheatsheet.pdf'
WHERE NOT EXISTS (SELECT 1 FROM materials WHERE course_id = 1 AND title = 'JavaScript Cheat Sheet');

-- Insert materials for course 2
INSERT INTO materials (course_id, title, description, type, file_url)
SELECT 2, 'Spring Boot Overview', 'Introduction to Spring Boot framework', 'VIDEO', 'https://www.youtube.com/watch?v=example2'
WHERE NOT EXISTS (SELECT 1 FROM materials WHERE course_id = 2 AND title = 'Spring Boot Overview');

INSERT INTO materials (course_id, title, description, type, file_url)
SELECT 2, 'JPA and Hibernate Guide', 'Database persistence with JPA', 'TEXT', 'https://example.com/jpa-guide.pdf'
WHERE NOT EXISTS (SELECT 1 FROM materials WHERE course_id = 2 AND title = 'JPA and Hibernate Guide');

-- Insert assignments for course 1
INSERT INTO assignments (course_id, title, description, due_date)
SELECT 1, 'Build a Personal Website', 'Create a simple personal website using HTML and CSS. Include at least 3 pages.', '2024-12-31 23:59:59'::timestamp
WHERE NOT EXISTS (SELECT 1 FROM assignments WHERE course_id = 1 AND title = 'Build a Personal Website');

INSERT INTO assignments (course_id, title, description, due_date)
SELECT 1, 'JavaScript Calculator', 'Build a functional calculator using vanilla JavaScript.', '2024-12-25 23:59:59'::timestamp
WHERE NOT EXISTS (SELECT 1 FROM assignments WHERE course_id = 1 AND title = 'JavaScript Calculator');

-- Insert assignments for course 2
INSERT INTO assignments (course_id, title, description, due_date)
SELECT 2, 'REST API Implementation', 'Create a REST API using Spring Boot with CRUD operations for a simple entity.', '2024-12-30 23:59:59'::timestamp
WHERE NOT EXISTS (SELECT 1 FROM assignments WHERE course_id = 2 AND title = 'REST API Implementation');

INSERT INTO assignments (course_id, title, description, due_date)
SELECT 2, 'Database Integration', 'Set up PostgreSQL database and integrate with Spring Boot application.', '2025-01-05 23:59:59'::timestamp
WHERE NOT EXISTS (SELECT 1 FROM assignments WHERE course_id = 2 AND title = 'Database Integration');

-- Insert sample submissions (assuming student_id = 1, assignment_id = 1)
INSERT INTO submissions (assignment_id, student_id, version, file_path, file_name, status, teacher_comment, grade, reviewed_at)
SELECT 1, 1, 1, '/uploads/submission1_v1.zip', 'my-website.zip', 'GRADED', 'Great work! The design is clean and responsive. Consider adding more interactive elements.', 85, '2024-12-15 10:30:00'::timestamp
WHERE NOT EXISTS (SELECT 1 FROM submissions WHERE assignment_id = 1 AND student_id = 1 AND version = 1);

INSERT INTO submissions (assignment_id, student_id, version, file_path, file_name, status, teacher_comment, grade, reviewed_at)
SELECT 1, 1, 2, '/uploads/submission1_v2.zip', 'my-website-v2.zip', 'GRADED', 'Excellent improvements! The interactive elements add a lot to the user experience.', 92, '2024-12-18 14:20:00'::timestamp
WHERE NOT EXISTS (SELECT 1 FROM submissions WHERE assignment_id = 1 AND student_id = 1 AND version = 2);

INSERT INTO submissions (assignment_id, student_id, version, file_path, file_name, status, teacher_comment, grade, reviewed_at)
SELECT 2, 1, 1, '/uploads/calculator.js', 'calculator.js', 'REVIEWED', 'Good implementation. Make sure to handle edge cases like division by zero.', NULL, '2024-12-20 09:15:00'::timestamp
WHERE NOT EXISTS (SELECT 1 FROM submissions WHERE assignment_id = 2 AND student_id = 1 AND version = 1);

