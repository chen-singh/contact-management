package com.main.contact.controller;


import com.main.contact.entity.Contact;
import com.main.contact.service.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {
    @Autowired
    private ServiceImpl service;


    public Contact getContact(String id){
        return service.getContact(id);
    }

}
