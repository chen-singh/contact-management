

// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import {  useNavigate } from "react-router-dom";

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

//     const navigate = useNavigate();

// const handleLogout = () => {
//   localStorage.removeItem("user");
//   navigate("/");
// };

// const goToProfile = () => {
//   navigate("/profile");
// };
//   const filteredContacts = contacts.filter(
//     (contact) =>
//       contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredContacts.length / pageSize);
//   const paginatedContacts = filteredContacts.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // =================== CREATE ===================
//   const handleCreate = (e) => {
//     e.preventDefault();
//     const newContact = { ...formData, id: Date.now() };
//     setContacts([...contacts, newContact]);
//     setShowCreate(false);
//     setFormData(initialFormState);
//     setCurrentPage(1);
//   };

//   // =================== UPDATE ===================
//   const openUpdateModal = (contact) => {
//     setSelectedContact(contact);
//     setFormData(contact);
//     setShowUpdate(true);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     setContacts(
//       contacts.map((c) => (c.id === selectedContact.id ? formData : c))
//     );
//     setShowUpdate(false);
//   };

//   // =================== DELETE ===================
//   const openDeleteModal = (contact) => {
//     setSelectedContact(contact);
//     setShowDelete(true);
//   };

//   const handleDelete = () => {
//     setContacts(contacts.filter((c) => c.id !== selectedContact.id));
//     setShowDelete(false);
//   };

//   return (
   
//       <div className="container mt-4">
//        <div className="d-flex justify-content-between align-items-center mb-3">
//    <h2>Contact Management</h2>

//    <div>
//      <button
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
//         <button
//           className="btn btn-primary"
//           onClick={() => {
//             setFormData(initialFormState);
//             setShowCreate(true);
//           }}
//         >
//           Create Contact
//         </button>
//       </div>

//       {/* Contact Table */}
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
//                   onClick={() => openDeleteModal(contact)}
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
//           {[...Array(totalPages)].map((_, idx) => (
//             <li
//               key={idx}
//               className={`page-item ${currentPage === idx + 1 && "active"}`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage(idx + 1)}
//               >
//                 {idx + 1}
//               </button>
//             </li>
//           ))}
//           <li
//             className={`page-item ${currentPage === totalPages && "disabled"}`}
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

//       {/* ================= MODALS ================= */}

//       {/* Create Modal */}
//       <Modal
//         title="Create Contact"
//         show={showCreate}
//         onClose={() => setShowCreate(false)}
//         footer={
//           <>
//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowCreate(false)}
//             >
//               Cancel
//             </button>
//             <button className="btn btn-primary" onClick={handleCreate}>
//               Save
//             </button>
//           </>
//         }
//       >
//         <input
//           className="form-control mb-2"
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={handleChange}
//         />
//       </Modal>

//       {/* Update Modal */}
//       <Modal
//         title="Update Contact"
//         show={showUpdate}
//         onClose={() => setShowUpdate(false)}
//         footer={
//           <>
//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowUpdate(false)}
//             >
//               Cancel
//             </button>
//             <button className="btn btn-warning" onClick={handleUpdate}>
//               Save Changes
//             </button>
//           </>
//         }
//       >
//         <input
//           className="form-control mb-2"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//         />
//       </Modal>

//       {/* Delete Modal */}
//       <Modal
//         title="Confirm Delete"
//         show={showDelete}
//         onClose={() => setShowDelete(false)}
//         footer={
//           <>
//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowDelete(false)}
//             >
//               Cancel
//             </button>
//             <button className="btn btn-danger" onClick={handleDelete}>
//               Confirm Delete
//             </button>
//           </>
//         }
//       >
//         Are you sure you want to delete this contact?
//       </Modal>
//     </div>
//   );
// };

// export default ContactManagement;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Modal from "./Modal";
// import { useNavigate } from "react-router-dom";

// const API_URL = "http://localhost:8080/api/contacts";

// const initialFormState = {
//   contactId: null,
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
//   const [totalPages, setTotalPages] = useState(1);

//   const [showCreate, setShowCreate] = useState(false);
//   const [showUpdate, setShowUpdate] = useState(false);
//   const [showDelete, setShowDelete] = useState(false);

//   const [selectedContact, setSelectedContact] = useState(null);
//   const [formData, setFormData] = useState(initialFormState);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchContacts();
//   }, [currentPage]);

//   // ================= FETCH CONTACTS =================
//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get(API_URL, {
//         params: {
//           page: currentPage - 1,
//           size: pageSize,
//         },
//       });

//       setContacts(response.data.content);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     }
//   };

//   // ================= SEARCH =================
//   const handleSearch = async (value) => {
//     setSearchTerm(value);
//     setCurrentPage(1);

//     if (!value) {
//       fetchContacts();
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_URL}/search`, {
//         params: {
//           firstName: value,
//           lastName: value,
//           page: 0,
//           size: pageSize,
//         },
//       });

//       setContacts(response.data.content || response.data);
//       setTotalPages(response.data.totalPages || 1);
//     } catch (error) {
//       console.error("Search error:", error);
//     }
//   };

//   // ================= FORM CHANGE =================
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ================= CREATE =================
//   const handleCreate = async (e) => {
//     e.preventDefault();

//     const payload = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       title: "",
//       emails: [
//         {
//           emailAddress: formData.email,
//           emailType: "WORK",
//           isPrimary: true,
//         },
//       ],
//       phones: [
//         {
//           phoneNumber: formData.phone,
//           phoneType: "MOBILE",
//           isPrimary: true,
//         },
//       ],
//     };

//     try {
//       await axios.post(API_URL, payload);
//       setShowCreate(false);
//       setFormData(initialFormState);
//       fetchContacts();
//     } catch (error) {
//       console.error("Create error:", error);
//     }
//   };

//   // ================= OPEN UPDATE =================
//   const openUpdateModal = (contact) => {
//     setSelectedContact(contact);

//     setFormData({
//       contactId: contact.contactId,
//       firstName: contact.firstName,
//       lastName: contact.lastName,
//       email: contact.emails?.[0]?.emailAddress || "",
//       phone: contact.phones?.[0]?.phoneNumber || "",
//     });

//     setShowUpdate(true);
//   };

//   // ================= UPDATE =================
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const payload = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       title: "",
//       emails: [
//         {
//           emailAddress: formData.email,
//           emailType: "WORK",
//           isPrimary: true,
//         },
//       ],
//       phones: [
//         {
//           phoneNumber: formData.phone,
//           phoneType: "MOBILE",
//           isPrimary: true,
//         },
//       ],
//     };

//     try {
//       await axios.put(`${API_URL}/${formData.contactId}`, payload);
//       setShowUpdate(false);
//       fetchContacts();
//     } catch (error) {
//       console.error("Update error:", error);
//     }
//   };

//   // ================= DELETE =================
//   const openDeleteModal = (contact) => {
//     setSelectedContact(contact);
//     setShowDelete(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${API_URL}/${selectedContact.contactId}`);
//       setShowDelete(false);
//       fetchContacts();
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   const goToProfile = () => {
//     navigate("/profile");
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>Contact Management</h2>
//         <div>
//           <button
//             className="btn btn-outline-primary me-2"
//             onClick={goToProfile}
//           >
//             Profile
//           </button>
//           <button className="btn btn-outline-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Search + Create */}
//       <div className="d-flex justify-content-between mb-3">
//         <input
//           type="text"
//           className="form-control w-50"
//           placeholder="Search by first or last name"
//           value={searchTerm}
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//         <button
//           className="btn btn-primary"
//           onClick={() => {
//             setFormData(initialFormState);
//             setShowCreate(true);
//           }}
//         >
//           Create Contact
//         </button>
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
//           {contacts.map((contact) => (
//             <tr key={contact.contactId}>
//               <td>{contact.firstName}</td>
//               <td>{contact.lastName}</td>
//               <td>{contact.emails?.[0]?.emailAddress}</td>
//               <td>{contact.phones?.[0]?.phoneNumber}</td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-warning me-2"
//                   onClick={() => openUpdateModal(contact)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() => openDeleteModal(contact)}
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
//           <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//             <button
//               className="page-link"
//               onClick={() => setCurrentPage(currentPage - 1)}
//             >
//               Previous
//             </button>
//           </li>

//           {[...Array(totalPages)].map((_, idx) => (
//             <li
//               key={idx}
//               className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage(idx + 1)}
//               >
//                 {idx + 1}
//               </button>
//             </li>
//           ))}

//           <li
//             className={`page-item ${
//               currentPage === totalPages ? "disabled" : ""
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

//       {/* CREATE MODAL */}
//       <Modal
//         title="Create Contact"
//         show={showCreate}
//         onClose={() => setShowCreate(false)}
//         footer={
//           <>
//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowCreate(false)}
//             >
//               Cancel
//             </button>
//             <button className="btn btn-primary" onClick={handleCreate}>
//               Save
//             </button>
//           </>
//         }
//       >
//         <input
//           className="form-control mb-2"
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={handleChange}
//         />
//       </Modal>

//       {/* UPDATE MODAL */}
//       <Modal
//         title="Update Contact"
//         show={showUpdate}
//         onClose={() => setShowUpdate(false)}
//         footer={
//           <>
//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowUpdate(false)}
//             >
//               Cancel
//             </button>
//             <button className="btn btn-warning" onClick={handleUpdate}>
//               Save Changes
//             </button>
//           </>
//         }
//       >
//         <input
//           className="form-control mb-2"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           className="form-control mb-2"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//         />
//       </Modal>

//       {/* DELETE MODAL */}
//       <Modal
//         title="Confirm Delete"
//         show={showDelete}
//         onClose={() => setShowDelete(false)}
//         footer={
//           <>
//             <button
//               className="btn btn-secondary"
//               onClick={() => setShowDelete(false)}
//             >
//               Cancel
//             </button>
//             <button className="btn btn-danger" onClick={handleDelete}>
//               Confirm Delete
//             </button>
//           </>
//         }
//       >
//         Are you sure you want to delete this contact?
//       </Modal>
//     </div>
//   );
// };

// export default ContactManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/contacts";

const initialFormState = {
  contactId: null,
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
  const [totalPages, setTotalPages] = useState(1);

  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedContact, setSelectedContact] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  const navigate = useNavigate();

  // ================= FETCH CONTACTS =================
  const fetchContacts = async (page = currentPage) => {
    try {
      const response = await axios.get(API_URL, {
        params: { page: page - 1, size: pageSize },
      });

      console.log("API response:", response.data); // 🔍 debug

      let contactsArray = [];
      let pages = 1;

      if (Array.isArray(response.data)) {
        // backend returns plain array
        contactsArray = response.data;
        pages = 1;
      } else if (Array.isArray(response.data.content)) {
        // backend returns paginated object
        contactsArray = response.data.content;
        pages =
          typeof response.data.totalPages === "number" &&
          response.data.totalPages > 0
            ? response.data.totalPages
            : 1;
      }

      setContacts(contactsArray);
      setTotalPages(pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ================= SEARCH =================
  const handleSearch = async (value) => {
    setSearchTerm(value);
    setCurrentPage(1);

    if (!value.trim()) {
      fetchContacts(1);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { firstName: value, lastName: value, page: 0, size: pageSize },
      });

      let contactsArray = [];
      let pages = 1;

      if (Array.isArray(response.data)) {
        contactsArray = response.data;
        pages = 1;
      } else if (Array.isArray(response.data.content)) {
        contactsArray = response.data.content;
        pages =
          typeof response.data.totalPages === "number" &&
          response.data.totalPages > 0
            ? response.data.totalPages
            : 1;
      }

      setContacts(contactsArray);
      setTotalPages(pages);
    } catch (error) {
      console.error("Search error:", error);
      setContacts([]);
      setTotalPages(1);
    }
  };

  // ================= FORM CHANGE =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= CREATE =================
  const handleCreate = async (e) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      title: "",
      emails: [
        { emailAddress: formData.email, emailType: "WORK", isPrimary: true },
      ],
      phones: [
        { phoneNumber: formData.phone, phoneType: "MOBILE", isPrimary: true },
      ],
    };

    try {
      await axios.post(API_URL, payload);
      setShowCreate(false);
      setFormData(initialFormState);
      fetchContacts(1); // fetch first page after create
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  // ================= OPEN UPDATE =================
  const openUpdateModal = (contact) => {
    setSelectedContact(contact);
    setFormData({
      contactId: contact.contactId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.emails?.[0]?.emailAddress || "",
      phone: contact.phones?.[0]?.phoneNumber || "",
    });
    setShowUpdate(true);
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      title: "",
      emails: [
        { emailAddress: formData.email, emailType: "WORK", isPrimary: true },
      ],
      phones: [
        { phoneNumber: formData.phone, phoneType: "MOBILE", isPrimary: true },
      ],
    };

    try {
      await axios.put(`${API_URL}/${formData.contactId}`, payload);
      setShowUpdate(false);
      fetchContacts(currentPage); // refresh current page
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // ================= DELETE =================
  const openDeleteModal = (contact) => {
    setSelectedContact(contact);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (!selectedContact) return;
    try {
      await axios.delete(`${API_URL}/${selectedContact.contactId}`);
      setShowDelete(false);
      // refetch page, if last contact deleted, move back a page
      if (contacts.length === 1 && currentPage > 1) {
        fetchContacts(currentPage - 1);
      } else {
        fetchContacts(currentPage);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contact Management</h2>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={goToProfile}>
            Profile
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Search + Create */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by first or last name"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
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

      {/* Table */}
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
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact.contactId}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.emails?.[0]?.emailAddress || "-"}</td>
                <td>{contact.phones?.[0]?.phoneNumber || "-"}</td>
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
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => currentPage > 1 && fetchContacts(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <li
                key={idx}
                className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => fetchContacts(idx + 1)}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() =>
                  currentPage < totalPages && fetchContacts(currentPage + 1)
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* CREATE MODAL */}
      <Modal
        title="Create Contact"
        show={showCreate}
        onClose={() => setShowCreate(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>
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

      {/* UPDATE MODAL */}
      <Modal
        title="Update Contact"
        show={showUpdate}
        onClose={() => setShowUpdate(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowUpdate(false)}>
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

      {/* DELETE MODAL */}
      <Modal
        title="Confirm Delete"
        show={showDelete}
        onClose={() => setShowDelete(false)}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowDelete(false)}>
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
