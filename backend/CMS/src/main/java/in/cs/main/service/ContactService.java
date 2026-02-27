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
import in.cs.main.entity.ContactPhone;
import in.cs.main.entity.ContactEmail;
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
public class ContactService {

    @Autowired
    private ContactRepository repository;


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


    public Page<ContactResponsedto> search(String keyword, Pageable pageable) {
        return repository.search(keyword, pageable)
                .map(ContactMapper::toDTO);
    }

    public ContactResponsedto update(Integer id, ContactRequestdto dto) {

        Contact existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        existing.setFirstName(dto.firstName);
        existing.setLastName(dto.lastName);
        existing.setTitle(dto.title);

        // Clear old emails & phones (IMPORTANT)
        existing.getEmails().clear();
        existing.getPhones().clear();

        if (dto.emails != null) {
            dto.emails.forEach(e -> {
                ContactEmail email = new ContactEmail();
                email.setEmailAddress(e.emailAddress);
                email.setEmailType(e.emailType);
                email.setIsPrimary(e.isPrimary);
                email.setContact(existing);
                existing.getEmails().add(email);
            });
        }

        if (dto.phones != null) {
            dto.phones.forEach(p -> {
                ContactPhone phone = new ContactPhone();
                phone.setPhoneNumber(p.phoneNumber);
                phone.setPhoneType(p.phoneType);
                phone.setIsPrimary(p.isPrimary);
                phone.setContact(existing);
                existing.getPhones().add(phone);
            });
        }

        Contact saved = repository.save(existing);

        return ContactMapper.toDTO(saved);
//    }public ContactResponsedto update(Integer id, ContactRequestdto dto) {
//
//        Contact existing = repository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Contact not found"));
//
//        existing.setFirstName(dto.firstName);
//        existing.setLastName(dto.lastName);
//        existing.setTitle(dto.title);
//
//        // Clear old emails & phones (IMPORTANT)
//        existing.getEmails().clear();
//        existing.getPhones().clear();
//
//        if (dto.emails != null) {
//            dto.emails.forEach(e -> {
//                ContactEmail email = new ContactEmail();
//                email.setEmailAddress(e.emailAddress);
//                email.setEmailType(e.emailType);
//                email.setIsPrimary(e.isPrimary);
//                email.setContact(existing);
//                existing.getEmails().add(email);
//            });
//        }
//
//        if (dto.phones != null) {
//            dto.phones.forEach(p -> {
//                ContactPhone phone = new ContactPhone();
//                phone.setPhoneNumber(p.phoneNumber);
//                phone.setPhoneType(p.phoneType);
//                phone.setIsPrimary(p.isPrimary);
//                phone.setContact(existing);
//                existing.getPhones().add(phone);
//            });
//        }
//
//        Contact saved = repository.save(existing);
//
//        return ContactMapper.toDTO(saved);
//    }
    }
}
