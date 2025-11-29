import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCourses, fetchProgress } from '../api/client';
import type { Course } from '../api/types';
import CourseCard from '../components/CourseCard';

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const coursesData = await fetchCourses();
      setCourses(coursesData);
      
      // Load progress for each course
      const progressPromises = coursesData.map(course => 
        fetchProgress(course.id).catch(() => ({ progress: 0 }))
      );
      const progressResults = await Promise.all(progressPromises);
      
      const progress: Record<number, number> = {};
      coursesData.forEach((course, index) => {
        progress[course.id] = progressResults[index].progress;
      });
      setProgressMap(progress);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return <div className="page"><div className="loading-state">Загрузка курсов...</div></div>;
  }

  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Учись в одном месте</h1>
            <p className="hero-subtitle">
              Все курсы, материалы и домашние задания — в единой онлайн-платформе.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => {
                const pageElement = document.querySelector('.page');
                if (pageElement) {
                  pageElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                Перейти к моим курсам
              </button>
            </div>
          </div>
          <div className="hero-card">
            <p style={{ color: 'white', fontSize: '1rem', lineHeight: '1.6' }}>
              Получайте доступ к учебным материалам, отправляйте домашние задания и отслеживайте свой прогресс.
            </p>
          </div>
        </div>
      </div>
      <main className="main-content">
        <div className="page">
          <h1 className="page-title">Мои курсы</h1>
          <div className="courses-grid">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                progress={progressMap[course.id] || 0}
                onClick={() => handleCourseClick(course.id)}
              />
            ))}
          </div>
          {courses.length === 0 && (
            <div className="empty-state">Курсы не найдены</div>
          )}
        </div>
      </main>
    </>
  );
}

export default CoursesPage;

