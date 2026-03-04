package in.cs.main.entity;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class ContactTest {

    @Test
    void testGettersAndSetters() {
        Contact contact = new Contact();

        contact.setContactId(1);
        contact.setFirstName("John");
        contact.setLastName("Doe");
        contact.setTitle("Manager");

        assertEquals(1, contact.getContactId());
        assertEquals("John", contact.getFirstName());
        assertEquals("Doe", contact.getLastName());
        assertEquals("Manager", contact.getTitle());
    }

    @Test
    void testEmailsAndPhonesInitialization() {
        Contact contact = new Contact();

        assertNotNull(contact.getEmails());
        assertNotNull(contact.getPhones());
        assertTrue(contact.getEmails().isEmpty());
        assertTrue(contact.getPhones().isEmpty());
    }

    @Test
    void testPrePersist() {
        Contact contact = new Contact();

        contact.onCreate();

        assertNotNull(contact.getCreatedAt());
        assertNotNull(contact.getUpdatedAt());
        assertEquals(contact.getCreatedAt(), contact.getUpdatedAt());
    }

    @Test
    void testPreUpdate() throws InterruptedException {
        Contact contact = new Contact();

        contact.onCreate();
        LocalDateTime createdTime = contact.getUpdatedAt();

        Thread.sleep(5); // small delay to ensure time difference

        contact.onUpdate();

        assertTrue(contact.getUpdatedAt().isAfter(createdTime));
    }
}