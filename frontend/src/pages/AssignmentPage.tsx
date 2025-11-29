import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAssignment, fetchSubmissions, submitAssignment } from '../api/client';
import type { Assignment, Submission } from '../api/types';

function AssignmentPage() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (assignmentId) {
      loadAssignmentData(parseInt(assignmentId));
    }
  }, [assignmentId]);

  const loadAssignmentData = async (id: number) => {
    try {
      const [assignmentData, submissionsData] = await Promise.all([
        fetchAssignment(id),
        fetchSubmissions(id)
      ]);
      setAssignment(assignmentData);
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Failed to load assignment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !assignmentId) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await submitAssignment(parseInt(assignmentId), selectedFile);
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      // Reload submissions
      await loadAssignmentData(parseInt(assignmentId));
    } catch (err) {
      setError('Не удалось отправить работу. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'GRADED':
        return 'status-graded';
      case 'REVIEWED':
        return 'status-reviewed';
      case 'SENT':
        return 'status-sent';
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'GRADED':
        return 'Оценено';
      case 'REVIEWED':
        return 'Проверено';
      case 'SENT':
        return 'Отправлено';
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="page"><div className="loading-state">Загрузка задания...</div></div>;
  }

  if (!assignment) {
    return <div className="page"><div className="empty-state">Задание не найдено</div></div>;
  }

  return (
    <main className="main-content">
      <div className="page">
      <div className="assignment-header">
        <h1 className="page-title">{assignment.title}</h1>
        <p className="assignment-description">{assignment.description}</p>
        {assignment.dueDate && (
          <p className="assignment-due-date">
            Срок сдачи: {formatDate(assignment.dueDate)}
          </p>
        )}
      </div>

      <section className="section">
        <h2 className="section-title">Загрузить решение</h2>
        <form className="submit-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="file-input">Выберите файл</label>
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              required
            />
            {selectedFile && (
              <div className="file-info">Выбран файл: {selectedFile.name}</div>
            )}
          </div>
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={submitting || !selectedFile}
          >
            {submitting ? 'Отправка...' : 'Отправить работу'}
          </button>
        </form>
      </section>

      <section className="section">
        <h2 className="section-title">Мои отправленные работы</h2>
        <div className="submissions-list">
          {submissions.length > 0 ? (
            submissions.map(submission => (
              <div key={submission.id} className="submission-card">
                <div className="submission-header">
                  <span className="submission-version">Версия {submission.version}</span>
                  <span className={`submission-status ${getStatusColor(submission.status)}`}>
                    {getStatusText(submission.status)}
                  </span>
                </div>
                <div className="submission-info">
                  <p><strong>Файл:</strong> {submission.fileName}</p>
                  <p><strong>Дата отправки:</strong> {formatDate(submission.submittedAt)}</p>
                  {submission.reviewedAt && (
                    <p><strong>Дата проверки:</strong> {formatDate(submission.reviewedAt)}</p>
                  )}
                </div>
                {submission.teacherComment && (
                  <div className="teacher-comment">
                    <strong>Комментарий преподавателя:</strong>
                    <p>{submission.teacherComment}</p>
                  </div>
                )}
                {submission.grade !== null && (
                  <div className="submission-grade">
                    <strong>Оценка:</strong> {submission.grade}/100
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">Пока нет отправленных работ</div>
          )}
        </div>
      </section>
      </div>
    </main>
  );
}

export default AssignmentPage;

