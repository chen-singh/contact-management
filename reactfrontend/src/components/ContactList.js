import React from "react";

const ContactList = ({
  contacts = [],
  onEdit,
  onDelete,
  page,
  setPage,
  hasNext = true,
  hasPrev = false
}) => {
  return (
    <div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Title</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No contacts found
              </td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.title}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(contact)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setPage(page - 1)}
          disabled={!hasPrev}
        >
          Prev
        </button>

        <span className="align-self-center">
          Page {page + 1}
        </span>

        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => setPage(page + 1)}
          disabled={!hasNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactList;
