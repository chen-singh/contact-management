package in.cs.main.service;

import in.cs.main.entities.Contact;
import in.cs.main.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public Contact createContact(Contact contact){
        return contactRepository.save(contact);
    }

    public Contact getContact(Long id){
        return contactRepository.findById(id).orElseThrow(()->new RuntimeException("Contact not found"));
    }


    public Page<Contact> contactPage(int page, int size) {

        return contactRepository.findAll(PageRequest.of(page, size));
    }
    public void deleteContact(Long id){
        contactRepository.deleteById(id);
    }

}
