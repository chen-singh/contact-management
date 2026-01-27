package com.main.contact.service;

import com.main.contact.entity.Contact;
import com.main.contact.repository.CrudRepository;
import com.main.contact.repository.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    @Autowired
    private CrudRepository crudRepository;

    @Autowired
    private UserInterface userrepo;

    @Autowired
    private AuthenticationManager authManager;



    @Autowired
    private PasswordEncoder passwordEncoder;

    public Contact createContact(Contact contact) {
        return crudRepository.save(contact);
    }


    public Page<Contact> contactPage(int page, int size) {
        return crudRepository.findAll(PageRequest.of(page, size));
    }

    public Contact getContact(Long id) {
        return crudRepository.findById(id).orElseThrow(() -> new RuntimeException("contact not found"));
    }

    public void delete(Contact contact) {

        crudRepository.delete(contact);
    }
}
