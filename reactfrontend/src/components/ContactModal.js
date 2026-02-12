import React, { useEffect, useState } from "react";

const ContactModal = ({ show, onClose, onSave, contact }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    title: "",
  });

  useEffect(() => {
    if (contact) {
      setForm(contact);
    }
  }, [contact]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>{contact ? "Update Contact" : "Create Contact"}</h5>
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-2"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            <input className="form-control mb-2"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            <input className="form-control mb-2"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <div className="d-flex justify-content-end">
              <button type="button"
                className="btn btn-secondary me-2"
                onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
