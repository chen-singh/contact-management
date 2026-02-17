//package in.cs.main.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import in.cs.main.entity.Contact;
//import in.cs.main.service.ContactService;
//
//@RestController
//@RequestMapping("/api/contacts")
//@CrossOrigin
//public class ContactController {
//
//    @Autowired
//    private ContactService service;
//
//    @GetMapping
//    public Page<Contact> list(
//            @RequestParam(required = false) String search,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "5") int size) {
//
//        return service.getAllContacts(search, PageRequest.of(page, size));
//    }
//
//    @GetMapping("/{id}")
//    public Contact get(@PathVariable Long id) {
//        return service.getContact(id);
//    }
//
//    @PostMapping
//    public Contact create(@RequestBody Contact contact) {
//        return service.save(contact);
//    }
//
//    @PutMapping("/{id}")
//    public Contact update(@PathVariable Long id,
//                          @RequestBody Contact contact) {
//        contact.setId(id);
//        return service.save(contact);
//    }
//
//    @DeleteMapping("/{id}")
//    public void delete(@PathVariable Long id) {
//        service.delete(id);
//    }
//}
package in.cs.main.controller;

import in.cs.main.dto.ContactRequestdto;
import in.cs.main.dto.ContactResponsedto;
import in.cs.main.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService service;

    @PostMapping
    public ContactResponsedto create(@RequestBody ContactRequestdto dto) {
        return service.create(dto);
    }

    @GetMapping("/{id}")
    public ContactResponsedto getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @GetMapping
    public List<ContactResponsedto> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
    @GetMapping("/filter")
    public Page<ContactResponsedto> filter(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone,
            Pageable pageable) {

        return service.filter(firstName, lastName, email, phone, pageable);
    }

}
