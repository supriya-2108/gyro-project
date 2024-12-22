import { useState } from "react";

export function DeleteConfirmationDialog({ onConfirm, isOpen, onClose }) {
  const handleClose = () => onClose();

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="dialog-overlay"
          onClick={handleClose}
          aria-hidden="true"
        >
          <div
            className="dialog-content"
            onClick={(e) => e.stopPropagation()}
            aria-hidden="true"
          >
            <div className="dialog-header">
              <h2>Are you absolutely sure?</h2>
            </div>
            <div className="dialog-description">
              This action cannot be undone. This will permanently delete the
              product from the database.
            </div>
            <div className="dialog-footer">
              <button onClick={handleClose} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleConfirm} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .btn {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
        }
        .btn-outline {
          border: 1px solid #ccc;
          background-color: transparent;
          color: #333;
        }
        .btn-secondary {
          background-color: #f3f3f3;
          border: 1px solid #ccc;
          color: #333;
        }
        .btn-danger {
          background-color: #e74c3c;
          color: white;
          border: none;
        }
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .dialog-content {
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .dialog-header h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .dialog-description {
          margin-bottom: 1rem;
        }
        .dialog-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
      `}</style>
    </>
  );
}
