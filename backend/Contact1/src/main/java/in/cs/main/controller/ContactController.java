package in.cs.main.controller;

import in.cs.main.entities.Contact;
import in.cs.main.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/contact")
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
        public void deleteContact(@PathVariable Long id){
               service.deleteContact(id);
        }

    }


