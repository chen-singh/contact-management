//package in.cs.main.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import in.cs.main.entity.Contact;
//import in.cs.main.exception.ResourceNotFoundException;
//import in.cs.main.repository.ContactRepository;
//import lombok.extern.slf4j.Slf4j;
//@Service
//@Slf4j
//public class ContactService {
//
//    @Autowired
//    private ContactRepository contactRepository;
//
//    public Page<Contact> getAllContacts(String search, Pageable pageable) {
//        log.info("Fetching contacts with search: {}", search);
//        if (search == null || search.isEmpty()) {
//            return contactRepository.findAll(pageable);
//        }
//        return contactRepository
//                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
//                        search, search, pageable);
//    }
//
//    public Contact getContact(Long id) {
//        return contactRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Contact not found"));
//    }
//
//    public Contact save(Contact contact) {
//        log.info("Saving contact: {}", contact.getFirstName());
//        return contactRepository.save(contact);
//    }
//
//    public void delete(Long id) {
//        log.info("Deleting contact id: {}", id);
//        contactRepository.deleteById(id);
//    }
//
//	public Page<Contact> getAllContacts(String search, PageRequest of) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//}
package in.cs.main.service;


import in.cs.main.dto.ContactRequestdto;
import in.cs.main.dto.ContactResponsedto;
import in.cs.main.entity.Contact;
import in.cs.main.mapper.ContactMapper;
import in.cs.main.mapper.ContactSpecification;
import in.cs.main.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;



import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactService  {

    @Autowired
    private final ContactRepository repository;


    public ContactResponsedto create(ContactRequestdto dto) {
        Contact contact = ContactMapper.toEntity(dto);
        Contact saved = repository.save(contact);
        return ContactMapper.toDTO(saved);
    }


    public ContactResponsedto getById(Integer id) {
        Contact contact = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        return ContactMapper.toDTO(contact);
    }


    public List<ContactResponsedto> getAll() {
        return repository.findAll()
                .stream()
                .map(ContactMapper::toDTO)
                .collect(Collectors.toList());
    }
    public Page<ContactResponsedto> getAll(Pageable pageable) {
        return repository.findAll(pageable)
                .map(ContactMapper::toDTO);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
    public Page<ContactResponsedto> filter(
            String firstName,
            String lastName,
            String email,
            String phone,
            Pageable pageable) {

        Specification<Contact> spec =
                ContactSpecification.filterBy(firstName, lastName, email, phone);

        return repository.findAll(spec, pageable)
                .map(ContactMapper::toDTO);
    }
}
