package com.main.contact.service;

import com.main.contact.repository.ContactRepository;
import com.main.contact.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.main.contact.model.Contact;

import java.util.Optional;

@Service
public class ContactService {
    @Autowired
    private ContactRepository crudRepository;

    @Autowired
    private UserRepository userrepo;

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

    public Optional<Contact> delete(Long id) {

        crudRepository.deleteById(id);
        return null;
    }
}
