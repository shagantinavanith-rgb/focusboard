import { useRef } from 'react';
import { useModal } from '../hooks/useModal.js';

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  const ref = useRef(null);
  useModal(ref, onCancel, '[data-autofocus]');

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div
        ref={ref}
        className="modal modal-sm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-msg"
      >
        <h2 id="confirm-title">{title}</h2>
        <p id="confirm-msg" className="confirm-msg">
          {message}
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-cancel" data-autofocus onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger-solid" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
