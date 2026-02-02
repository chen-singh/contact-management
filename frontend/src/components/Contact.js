

// import { useState } from "react";
// import ContactForm from "./ContactForm";
// import ConfirmModal from "./ConfirmModal";
// import Pagination from "./Pagination";

// function Contacts() {
//   const [contacts, setContacts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [showDelete, setShowDelete] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const filteredContacts = contacts.filter(c =>
//     c.firstName.toLowerCase().includes(search.toLowerCase()) ||
//     c.lastName.toLowerCase().includes(search.toLowerCase())
//   );

//   const paginatedContacts = filteredContacts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const saveContact = (contact) => {
//     if (contact.id) {
//       setContacts(contacts.map(c => c.id === contact.id ? contact : c));
//     } else {
//       setContacts([...contacts, { ...contact, id: Date.now() }]);
//     }
//     setShowForm(false);
//   };

//   const deleteContact = () => {
//     setContacts(contacts.filter(c => c.id !== selectedContact.id));
//     setShowDelete(false);
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row mb-3">
//         <div className="col-md-6 mb-2">
//           <input className="form-control" placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} />
//         </div>
//         <div className="col-md-6 text-md-end mb-2">
//           <button className="btn btn-primary" onClick={() => { setSelectedContact(null); setShowForm(true); }}>
//             ➕ Create Contact
//           </button>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-striped table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Phone</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedContacts.map(contact => (
//               <tr key={contact.id}>
//                 <td>{contact.firstName}</td>
//                 <td>{contact.lastName}</td>
//                 <td>{contact.phone}</td>
//                 <td className="text-center">
//                   <button className="btn btn-sm btn-warning me-2" onClick={() => { setSelectedContact(contact); setShowForm(true); }}>Edit</button>
//                   <button className="btn btn-sm btn-danger" onClick={() => { setSelectedContact(contact); setShowDelete(true); }}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Pagination total={filteredContacts.length} perPage={itemsPerPage} current={currentPage} onChange={setCurrentPage} />

//       {showForm && <ContactForm contact={selectedContact} onSave={saveContact} onCancel={() => setShowForm(false)} />}
//       {showDelete && <ConfirmModal onConfirm={deleteContact} onCancel={() => setShowDelete(false)} />}
//     </div>
//   );
// }

// export default Contacts;
import { useState, useEffect } from "react";
import api from "../api/apiaxious";
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

  // ✅ CALL PROTECTED API HERE
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contacts"); // JWT sent automatically
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to load contacts", err);
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const filteredContacts = contacts.filter(c =>
    c.firstName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastName.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const saveContact = async (contact) => {
    if (contact.id) {
      await api.put(`/contacts/${contact.id}`, contact);
    } else {
      await api.post("/contacts", contact);
    }
    fetchContacts();
    setShowForm(false);
  };

  const deleteContact = async () => {
    await api.delete(`/contacts/${selectedContact.id}`);
    fetchContacts();
    setShowDelete(false);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            className="form-control"
            placeholder="Search contacts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-md-end mb-2">
          <button
            className="btn btn-primary"
            onClick={() => { setSelectedContact(null); setShowForm(true); }}
          >
            ➕ Create Contact
          </button>
        </div>
      </div>

      <table className="table table-striped">
        <tbody>
          {paginatedContacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => { setSelectedContact(contact); setShowForm(true); }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => { setSelectedContact(contact); setShowDelete(true); }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
          onConfirm={deleteContact}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}

export default Contacts;
