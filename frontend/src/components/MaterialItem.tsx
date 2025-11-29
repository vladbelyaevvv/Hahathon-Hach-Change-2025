import type { Material } from '../api/types';

interface MaterialItemProps {
  material: Material;
}

function MaterialItem({ material }: MaterialItemProps) {
  const handleOpen = () => {
    if (material.fileUrl) {
      if (material.type === 'VIDEO' || material.fileUrl.startsWith('http')) {
        window.open(material.fileUrl, '_blank');
      } else {
        // For local files, you might want to create a download endpoint
        window.open(material.fileUrl, '_blank');
      }
    }
  };

  const getTypeIcon = () => {
    switch (material.type) {
      case 'VIDEO':
        return '🎥';
      case 'TEXT':
        return '📄';
      case 'FILE':
        return '📎';
      default:
        return '📄';
    }
  };

  const getTypeLabel = () => {
    switch (material.type) {
      case 'VIDEO':
        return 'Видео';
      case 'TEXT':
        return 'Текст';
      case 'FILE':
        return 'Файл';
      default:
        return 'Материал';
    }
  };

  return (
    <div className="material-item">
      <div className="material-icon">{getTypeIcon()}</div>
      <div className="material-content">
        <h4 className="material-title">
          {material.title}
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', fontWeight: 'normal', marginLeft: '0.5rem' }}>
            ({getTypeLabel()})
          </span>
        </h4>
        {material.description && (
          <p className="material-description">{material.description}</p>
        )}
      </div>
      {material.fileUrl && (
        <button className="btn btn-secondary" onClick={handleOpen}>
          Открыть
        </button>
      )}
    </div>
  );
}

export default MaterialItem;

