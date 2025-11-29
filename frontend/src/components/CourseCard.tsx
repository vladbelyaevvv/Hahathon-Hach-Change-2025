import type { Course } from '../api/types';
import ProgressBar from './ProgressBar';

interface CourseCardProps {
  course: Course;
  progress: number;
  onClick: () => void;
}

function CourseCard({ course, progress, onClick }: CourseCardProps) {
  return (
    <div className="course-card" onClick={onClick}>
      <h3 className="course-card-title">{course.title}</h3>
      <p className="course-card-description">{course.description}</p>
      <div className="course-card-progress">
        <div className="progress-label">Прогресс по курсу</div>
        <ProgressBar progress={progress} />
        <span className="progress-text">{progress}% завершено</span>
      </div>
    </div>
  );
}

export default CourseCard;

