
function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center">
            <p>Are you sure you want to delete this contact?</p>
            <button className="btn btn-danger me-2" onClick={onConfirm}>Confirm</button>
            <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
