// import React, { useEffect, useState } from "react";
// import { getContacts, deleteContact } from "../services/contactService";

// const DashboardPage = () => {
//   const [contacts, setContacts] = useState([]);

//   const fetchContacts = async () => {
//     const res = await getContacts();
//     setContacts(res.data.content);
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const handleDelete = async (id) => {
//     await deleteContact(id);
//     fetchContacts();
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Contacts</h3>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Title</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {contacts.map((c) => (
//             <tr key={c.id}>
//               <td>{c.firstName} {c.lastName}</td>
//               <td>{c.title}</td>
//               <td>
//                 <button className="btn btn-danger btn-sm"
//                   onClick={() => handleDelete(c.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DashboardPage;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Header";
import ContactModal from "../components/ContactModal";
import ConfirmModal from "../components/ConfirmModal";
import ContactList from "../components/ContactList";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  searchContacts
} from "../service/contactService";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [keyword, setKeyword] = useState("");

  const fetchContacts = async () => {
    const res = await getContacts(page);
    setContacts(res.data.content);
  };

  useEffect(() => {
    fetchContacts();
  }, [page]);

  const handleSave = async (data) => {
    if (selectedContact) {
      await updateContact(selectedContact.id, data);
    } else {
      await createContact(data);
    }
    setShowModal(false);
    fetchContacts();
  };

  const handleDelete = async () => {
    await deleteContact(deleteId);
    setShowConfirm(false);
    fetchContacts();
  };

  const handleSearch = async () => {
    const res = await searchContacts(keyword);
    setContacts(res.data);
  };

  return (
    
  

    <>
  <ContactList
  contacts={contacts}
  page={page}
  setPage={setPage}
  hasPrev={page > 0}
  hasNext={contacts.length === 10} // assuming page size = 10
  onEdit={(contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  }}
  onDelete={(id) => {
    setDeleteId(id);
    setShowConfirm(true);
  }}
/>

      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <input className="form-control w-50"
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)} />
          <button className="btn btn-primary ms-2"
            onClick={handleSearch}>
            Search
          </button>
          <button className="btn btn-success ms-2"
            onClick={() => {
              setSelectedContact(null);
              setShowModal(true);
            }}>
            + Add Contact
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.firstName} {c.lastName}</td>
                <td>{c.title}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setSelectedContact(c);
                      setShowModal(true);
                    }}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => {
                      setDeleteId(c.id);
                      setShowConfirm(true);
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-primary me-2"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}>
            Prev
          </button>
          <button className="btn btn-outline-primary"
            onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>

      <ContactModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        contact={selectedContact}
      />

      <ConfirmModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Dashboard;
