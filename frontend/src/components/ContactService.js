
import axios from "axios";

const API_URL = "http://localhost:8080/api/contacts";

export const getContacts = (page = 0, size = 10) => {
  return axios.get(`${API_URL}?page=${page}&size=${size}`);
};

export const createContact = (contact) => {
  return axios.post(API_URL, contact);
};

export const searchByName = (firstName, lastName) => {
  return axios.get(`${API_URL}/search`, {
    params: { firstName, lastName }
  });
};
