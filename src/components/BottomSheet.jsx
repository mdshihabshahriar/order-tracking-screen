import { IconX } from './Icons';

export default function BottomSheet({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="bottom-sheet-handle" />
        <div className="bottom-sheet-header">
          <h2 className="bottom-sheet-title">{title}</h2>
          <button className="bottom-sheet-close" onClick={onClose} aria-label="Close">
            <IconX size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
