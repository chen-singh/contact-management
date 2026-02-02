import { useState } from "react";
import ContactForm from "./ContactForm";
import ConfirmModal from "./ConfirmModal";
import Pagination from "./Pagination";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredContacts = contacts.filter(
    (c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const saveContact = (contact) => {
    if (contact.id) {
      setContacts(contacts.map(c => c.id === contact.id ? contact : c));
    } else {
      setContacts([...contacts, { ...contact, id: Date.now() }]);
    }
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3 align-items-center">
        <div className="col-md-6 col-sm-12 mb-2">
          <input
            className="form-control"
            placeholder="Search contacts..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6 col-sm-12 text-md-end">
          <button
            className="btn btn-primary w-100 w-md-auto"
            onClick={() => { setSelectedContact(null); setShowForm(true); }}
          >
            ➕ Create Contact
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.phone}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => { setSelectedContact(contact); setShowForm(true); }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => { setSelectedContact(contact); setShowDelete(true); }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        total={filteredContacts.length}
        perPage={itemsPerPage}
        current={currentPage}
        onChange={setCurrentPage}
      />

      {showForm && (
        <ContactForm
          contact={selectedContact}
          onSave={saveContact}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showDelete && (
        <ConfirmModal
          onConfirm={() => {
            setContacts(contacts.filter(c => c.id !== selectedContact.id));
            setShowDelete(false);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}

export default Contacts;
