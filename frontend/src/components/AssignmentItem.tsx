import type { Assignment } from '../api/types';

interface AssignmentItemProps {
  assignment: Assignment;
  onClick: () => void;
}

function AssignmentItem({ assignment, onClick }: AssignmentItemProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="assignment-item" onClick={onClick}>
      <div className="assignment-item-content">
        <h4 className="assignment-item-title">{assignment.title}</h4>
        {assignment.description && (
          <p className="assignment-item-description">{assignment.description}</p>
        )}
        {assignment.dueDate && (
          <p className="assignment-item-due">
            Срок сдачи: {formatDate(assignment.dueDate)}
          </p>
        )}
      </div>
      <button className="btn btn-primary">Перейти к заданию</button>
    </div>
  );
}

export default AssignmentItem;

