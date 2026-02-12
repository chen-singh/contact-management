import api from "../api/axiosconfig";

export const getContacts = (page = 0, size = 10) => {
  return api.get(`/contacts?page=${page}&size=${size}`);
};

export const searchContacts = (keyword) => {
  return api.get(`/contacts/search?keyword=${keyword}`);
};

export const createContact = (data) => {
  return api.post("/contacts", data);
};

export const updateContact = (id, data) => {
  return api.put(`/contacts/${id}`, data);
};

export const deleteContact = (id) => {
  return api.delete(`/contacts/${id}`);
};
