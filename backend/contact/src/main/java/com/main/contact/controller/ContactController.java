package com.main.contact.controller;


import com.main.contact.entity.Contact;
import com.main.contact.entity.User;
import com.main.contact.service.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class ContactController {
    @Autowired
    private ServiceImpl service;

    @GetMapping("/Contact/{id}")
    public ResponseEntity<Contact> getContact(@PathVariable Long id){
        return ResponseEntity.ok().body(service.getContact(id));
    }


    @PostMapping("/Contact")
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact){
      return ResponseEntity.ok().body(service.createContact(contact));

    }
    @GetMapping("/Contact")
    public ResponseEntity<Page<Contact>> getAllContacts(@RequestParam (value = "page" ,defaultValue ="0" ) int page,
                                                        @RequestParam (value = "size",defaultValue = "5") int size){
        return ResponseEntity.ok().body(service.contactPage(page,size));
    }

    @PostMapping("/user")
    public ResponseEntity<Boolean> registerUser(User user){
        return ResponseEntity.ok().body(service.register(user));
    }

}
