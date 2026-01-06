package com.main.contact.service;

import com.main.contact.entity.Contact;
import com.main.contact.repository.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceImpl {
    @Autowired
    private CrudRepository crudRepository;


    public Contact createContact(Contact contact){
        return crudRepository.save(contact);
    }

}
