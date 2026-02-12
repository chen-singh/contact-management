import React from "react";

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Confirm Delete</h5>
          <p>Are you sure you want to delete this contact?</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary me-2"
              onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger"
              onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
