
import { useState } from "react";

function ContactForm({ contact, onSave, onCancel }) {
  const [form, setForm] = useState(contact || { firstName: "", lastName: "", phone: "" });

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{contact ? "Update Contact" : "Create Contact"}</h5>
          </div>
          <div className="modal-body">
            <input className="form-control mb-2" placeholder="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
            <input className="form-control mb-2" placeholder="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
            <input className="form-control" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button className="btn btn-success" onClick={() => onSave({ ...form, id: contact?.id })}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
