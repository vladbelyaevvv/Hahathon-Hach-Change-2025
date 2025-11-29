import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourse, fetchMaterials, fetchAssignments, fetchProgress } from '../api/client';
import type { Course, Material, Assignment } from '../api/types';
import MaterialItem from '../components/MaterialItem';
import AssignmentItem from '../components/AssignmentItem';
import ProgressBar from '../components/ProgressBar';

function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      loadCourseData(parseInt(courseId));
    }
  }, [courseId]);

  const loadCourseData = async (id: number) => {
    try {
      const [courseData, materialsData, assignmentsData, progressData] = await Promise.all([
        fetchCourse(id),
        fetchMaterials(id),
        fetchAssignments(id),
        fetchProgress(id).catch(() => ({ progress: 0 }))
      ]);
      
      setCourse(courseData);
      setMaterials(materialsData);
      setAssignments(assignmentsData);
      setProgress(progressData.progress);
    } catch (error) {
      console.error('Failed to load course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentClick = (assignmentId: number) => {
    navigate(`/assignments/${assignmentId}`);
  };

  if (loading) {
    return <div className="page"><div className="loading-state">Загрузка курса...</div></div>;
  }

  if (!course) {
    return <div className="page"><div className="empty-state">Курс не найден</div></div>;
  }

  return (
    <main className="main-content">
      <div className="page">
      <div className="course-header">
        <h1 className="page-title">{course.title}</h1>
        <p className="course-description">{course.description}</p>
        <div className="course-card-progress">
          <div className="progress-label">Прогресс по курсу</div>
          <ProgressBar progress={progress} />
          <span className="progress-text">{progress}% завершено</span>
        </div>
      </div>

      <section className="section">
        <h2 className="section-title">Материалы курса</h2>
        <div className="materials-list">
          {materials.length > 0 ? (
            materials.map(material => (
              <MaterialItem key={material.id} material={material} />
            ))
          ) : (
            <div className="empty-state">Пока нет материалов</div>
          )}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Домашние задания</h2>
        <div className="assignments-list">
          {assignments.length > 0 ? (
            assignments.map(assignment => (
              <AssignmentItem
                key={assignment.id}
                assignment={assignment}
                onClick={() => handleAssignmentClick(assignment.id)}
              />
            ))
          ) : (
            <div className="empty-state">Пока нет домашних заданий</div>
          )}
        </div>
      </section>
      </div>
    </main>
  );
}

export default CoursePage;

