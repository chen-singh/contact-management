package com.main.contact.service;

import com.main.contact.entity.Contact;
import com.main.contact.repository.CrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ServiceImpl {
    @Autowired
    private CrudRepository crudRepository;


    public Contact createContact(Contact contact){
        return crudRepository.save(contact);
    }

    public Page<Contact> contactPage(int page,int size){
        return crudRepository.findAll(PageRequest.of(page,size, Sort.by("name")));
    }
    public Contact getContact(String id){
        return crudRepository.findById(id).orElseThrow(()->new RuntimeException("contact not found"));
    }
    public void delete(Contact contact){
        crudRepository.delete(contact);
    }

}
