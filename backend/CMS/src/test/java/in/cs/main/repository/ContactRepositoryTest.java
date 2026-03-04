//package in.cs.main.repository;
//
//import in.cs.main.entity.Contact;
//import in.cs.main.entity.ContactEmail;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@DataJpaTest
//class ContactRepositoryTest {
//
//    @Autowired
//    private ContactRepository repository;
//
//    @Test
//    void testSaveContact() {
//        Contact contact = new Contact();
//        contact.setFirstName("John");
//        contact.setLastName("Doe");
//
//        Contact saved = repository.save(contact);
//
//        assertNotNull(saved.getContactId());
//        assertNotNull(saved.getCreatedAt());
//        assertNotNull(saved.getUpdatedAt());
//    }
//
//    @Test
//    void testCascadeAndOrphanRemoval() {
//        Contact contact = new Contact();
//        contact.setFirstName("John");
//        contact.setLastName("Doe");
//
//        ContactEmail email = new ContactEmail();
//        email.setEmailAddress("john@test.com");
//        email.setContact(contact);
//
//        contact.getEmails().add(email);
//
//        Contact saved = repository.save(contact);
//
//        assertEquals(1, saved.getEmails().size());
//
//        saved.getEmails().clear();
//        repository.save(saved);
//
//        Optional<Contact> updated = repository.findById(saved.getContactId());
//        assertTrue(updated.get().getEmails().isEmpty());
//    }
//}