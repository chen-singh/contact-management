// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const initialFormState = {
//   id: null,
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
// };

// const ContactManagement = () => {
//   const [contacts, setContacts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(5);

//   const [showCreate, setShowCreate] = useState(false);
//   const [showUpdate, setShowUpdate] = useState(false);
//   const [showDelete, setShowDelete] = useState(false);

//   const [selectedContact, setSelectedContact] = useState(null);
//   const [formData, setFormData] = useState(initialFormState);

//   useEffect(() => {
//     const dummyContacts = [];
//     for (let i = 1; i <= 25; i++) {
//       dummyContacts.push({
//         id: i,
//         firstName: "First" + i,
//         lastName: "Last" + i,
//         email: `user${i}@mail.com`,
//         phone: "1234567890",
//       });
//     }
//     setContacts(dummyContacts);
//   }, []);
//   const navigate = useNavigate();

// const handleLogout = () => {
//   localStorage.removeItem("user");
//   navigate("/");
// };

// const goToProfile = () => {
//   navigate("/profile");
// };


//   // Filter
//   const filteredContacts = contacts.filter(
//     (contact) =>
//       contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination
//   const totalPages = Math.ceil(filteredContacts.length / pageSize);
//   const paginatedContacts = filteredContacts.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Create
//   // const handleCreate = () => {
//   //   const newContact = {
//   //     ...formData,
//   //     id: contacts.length + 1,
//   //   };
//   //   setContacts([...contacts, newContact]);
//   //   setShowCreate(false);
//   //   setFormData(initialFormState);
//   // };
// const handleCreate = (e) => {
//   e.preventDefault();

//   const newContact = {
//     ...formData,
//     id: Date.now(), // better unique ID
//   };

//   setContacts([...contacts, newContact]);

//   setShowCreate(false);      // close modal
//   setFormData(initialFormState); // reset form
// };

//   // Open Update
//   const openUpdateModal = (contact) => {
//     setSelectedContact(contact);
//     setFormData(contact);
//     setShowUpdate(true);
//   };

//   // Update
//   const handleUpdate = () => {
//     const updated = contacts.map((contact) =>
//       contact.id === selectedContact.id ? formData : contact
//     );
//     setContacts(updated);
//     setShowUpdate(false);
//   };

//   // Delete
//   const handleDelete = () => {
//     const updated = contacts.filter(
//       (contact) => contact.id !== selectedContact.id
//     );
//     setContacts(updated);
//     setShowDelete(false);
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//   <h2>Contact Management</h2>

//   <div>
//     <button
//       className="btn btn-outline-primary me-2"
//       onClick={goToProfile}
//     >
//       Profile
//     </button>

//     <button
//       className="btn btn-outline-danger"
//       onClick={handleLogout}
//     >
//       Logout
//     </button>
//   </div>
// </div>

    

//       {/* Search + Create */}
//       <div className="d-flex justify-content-between mb-3">
//         <input
//           type="text"
//           className="form-control w-50"
//           placeholder="Search by first or last name"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//         />

//           <button
//   className="btn btn-primary"
//   onClick={() => {
//     setFormData(initialFormState);   // Reset form
//     setShowCreate(true);             // Open modal
//   }}
// >
//   Create Contact
// </button>

//         {/* <button
//           className="btn btn-primary"
//           onClick={() => setShowCreate(true)}
//         >
//           Create Contact
//         </button> */}
//       </div>

//       {/* Table */}
//       <table className="table table-bordered table-striped">
//         <thead className="table-dark">
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th width="180">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedContacts.map((contact) => (
//             <tr key={contact.id}>
//               <td>{contact.firstName}</td>
//               <td>{contact.lastName}</td>
//               <td>{contact.email}</td>
//               <td>{contact.phone}</td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-warning me-2"
//                   onClick={() => openUpdateModal(contact)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() => {
//                     setSelectedContact(contact);
//                     setShowDelete(true);
//                   }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <nav>
//         <ul className="pagination">
//           <li className={`page-item ${currentPage === 1 && "disabled"}`}>
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage(currentPage - 1)}
//             >
//               Previous
//             </button>
//           </li>

//           {[...Array(totalPages)].map((_, index) => (
//             <li
//               key={index}
//               className={`page-item ${currentPage === index + 1 && "active"}`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}

//           <li
//             className={`page-item ${
//               currentPage === totalPages && "disabled"
//             }`}
//           >
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage(currentPage + 1)}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>

//       {/* ================= CREATE MODAL ================= */}
//       {/* {showCreate && (
//   <div className="modal d-block" tabIndex="-1">
//     <div className="modal-dialog">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5>Create Contact</h5>
//           <button
//             className="btn-close"
//             onClick={() => setShowCreate(false)}
//           ></button>
//         </div>

//         <div className="modal-body">
//           <form onSubmit={handleCreate}>
//             <input
//               className="form-control mb-2"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />

//             <input
//               className="form-control mb-2"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />

//             <input
//               className="form-control mb-2"
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             <input
//               className="form-control mb-2"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />

//             <div className="modal-footer px-0">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setShowCreate(false)}
//               >
//                 Cancel
//               </button>

//               <button type="submit" className="btn btn-primary">
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// )} */}
// {showCreate && (
//   <>
//     {/* Backdrop */}
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         zIndex: 1040,
//       }}
//     ></div>

//     {/* Modal */}
//     <div
//       style={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         zIndex: 1050,
//         width: "100%",
//         maxWidth: "500px",
//       }}
//     >
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title">Create Contact</h5>
//           <button
//             type="button"
//             className="btn-close"
//             onClick={() => setShowCreate(false)}
//           ></button>
//         </div>

//         <div className="modal-body">
//           <form onSubmit={handleCreate}>
//             <input
//               className="form-control mb-2"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//             <input
//               className="form-control mb-2"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />
//             <input
//               className="form-control mb-2"
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               className="form-control mb-2"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />

//             <div className="modal-footer px-0">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setShowCreate(false)}
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </>
// )}



//       {/* {showCreate && (
//         <div className="modal d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5>Create Contact</h5>
//                 <button className="btn-close" onClick={() => setShowCreate(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <input className="form-control mb-2" name="firstName" placeholder="First Name" onChange={handleChange} />
//                 <input className="form-control mb-2" name="lastName" placeholder="Last Name" onChange={handleChange} />
//                 <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
//                 <input className="form-control mb-2" name="phone" placeholder="Phone" onChange={handleChange} />
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
//                 <button className="btn btn-primary" onClick={handleCreate}>Save</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )} */}

//       {/* ================= UPDATE MODAL ================= */}
//       {showUpdate && (
//         <div className="modal d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5>Update Contact</h5>
//                 <button className="btn-close" onClick={() => setShowUpdate(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <input className="form-control mb-2" name="firstName" value={formData.firstName} onChange={handleChange} />
//                 <input className="form-control mb-2" name="lastName" value={formData.lastName} onChange={handleChange} />
//                 <input className="form-control mb-2" name="email" value={formData.email} onChange={handleChange} />
//                 <input className="form-control mb-2" name="phone" value={formData.phone} onChange={handleChange} />
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={() => setShowUpdate(false)}>Cancel</button>
//                 <button className="btn btn-warning" onClick={handleUpdate}>Save Changes</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================= DELETE MODAL ================= */}
//       {showDelete && (
//         <div className="modal d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5>Confirm Delete</h5>
//                 <button className="btn-close" onClick={() => setShowDelete(false)}></button>
//               </div>
//               <div className="modal-body">
//                 Are you sure you want to delete this contact?
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={() => setShowDelete(false)}>Cancel</button>
//                 <button className="btn btn-danger" onClick={handleDelete}>Confirm Delete</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactManagement;

import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const initialFormState = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedContact, setSelectedContact] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const dummyContacts = [];
    for (let i = 1; i <= 25; i++) {
      dummyContacts.push({
        id: i,
        firstName: "First" + i,
        lastName: "Last" + i,
        email: `user${i}@mail.com`,
        phone: "1234567890",
      });
    }
    setContacts(dummyContacts);
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContacts.length / pageSize);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =================== CREATE ===================
  const handleCreate = (e) => {
    e.preventDefault();
    const newContact = { ...formData, id: Date.now() };
    setContacts([...contacts, newContact]);
    setShowCreate(false);
    setFormData(initialFormState);
    setCurrentPage(1);
  };

  // =================== UPDATE ===================
  const openUpdateModal = (contact) => {
    setSelectedContact(contact);
    setFormData(contact);
    setShowUpdate(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setContacts(
      contacts.map((c) => (c.id === selectedContact.id ? formData : c))
    );
    setShowUpdate(false);
  };

  // =================== DELETE ===================
  const openDeleteModal = (contact) => {
    setSelectedContact(contact);
    setShowDelete(true);
  };

  const handleDelete = () => {
    setContacts(contacts.filter((c) => c.id !== selectedContact.id));
    setShowDelete(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Contact Management</h2>

      {/* Search + Create */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by first or last name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            setFormData(initialFormState);
            setShowCreate(true);
          }}
        >
          Create Contact
        </button>
      </div>

      {/* Contact Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th width="180">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => openUpdateModal(contact)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => openDeleteModal(contact)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, idx) => (
            <li
              key={idx}
              className={`page-item ${currentPage === idx + 1 && "active"}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* ================= MODALS ================= */}

      {/* Create Modal */}
      <Modal
        title="Create Contact"
        show={showCreate}
        onClose={() => setShowCreate(false)}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowCreate(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleCreate}>
              Save
            </button>
          </>
        }
      >
        <input
          className="form-control mb-2"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Modal>

      {/* Update Modal */}
      <Modal
        title="Update Contact"
        show={showUpdate}
        onClose={() => setShowUpdate(false)}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowUpdate(false)}
            >
              Cancel
            </button>
            <button className="btn btn-warning" onClick={handleUpdate}>
              Save Changes
            </button>
          </>
        }
      >
        <input
          className="form-control mb-2"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Confirm Delete"
        show={showDelete}
        onClose={() => setShowDelete(false)}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowDelete(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Confirm Delete
            </button>
          </>
        }
      >
        Are you sure you want to delete this contact?
      </Modal>
    </div>
  );
};

export default ContactManagement;
