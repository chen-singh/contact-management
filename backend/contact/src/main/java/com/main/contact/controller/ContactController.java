package com.main.contact.controller;


import com.main.contact.entity.Contact;
import com.main.contact.entity.User;
import com.main.contact.service.ContactService;
import com.main.contact.service.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/Contact")
public class ContactController {
    @Autowired
    private ContactService service;
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContact(@PathVariable Long id){
        return ResponseEntity.ok().body(service.getContact(id));
    }


    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact){
      return ResponseEntity.ok().body(service.createContact(contact));

    }
    @GetMapping
    public ResponseEntity<Page<Contact>> getAllContacts(@RequestParam (value = "page" ,defaultValue ="0" ) int page,
                                                        @RequestParam (value = "size",defaultValue = "5") int size){
        return ResponseEntity.ok().body(service.contactPage(page,size));
    }
    @DeleteMapping
    public Optional<Contact> deleteContact(@PathVariable Long id){
      return   service.delete(id);
    }

}
