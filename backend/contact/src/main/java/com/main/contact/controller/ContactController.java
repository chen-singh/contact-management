package com.main.contact.controller;


import com.main.contact.entity.Contact;
import com.main.contact.entity.User;
import com.main.contact.service.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @PostMapping("/users")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        return ResponseEntity.ok().body(service.register(user));
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user){
        return ResponseEntity.ok().body(service.createUser(user));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUSer(@PathVariable int id){
        return ResponseEntity.ok().body(service.getUser(id));
    }

    @PostMapping("/login")
    public User login(@RequestBody User user){
        return service.loginuser(user.getEmail(), user.getPassword());

    }
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String username=authentication.getName();
        User user1=service.findByUserName(username);
        if (user1!=null){
            user1.setName(user.getName());
            user1.setEmail(user.getEmail());
            user1.setPassword(user.getPassword());
            service.createUser(user1);
        }
         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
