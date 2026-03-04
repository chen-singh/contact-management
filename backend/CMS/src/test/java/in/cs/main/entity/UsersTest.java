package in.cs.main.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UsersTest {

    @Test
    void testUsersGettersAndSetters() {
        Users user = new Users();

        user.setUser_id(1L);
        user.setName("John Doe");
        user.setEmail("john@example.com");
        user.setPassword("password123");

        assertEquals(1L, user.getUser_id());
        assertEquals("John Doe", user.getName());
        assertEquals("john@example.com", user.getEmail());
        assertEquals("password123", user.getPassword());
    }

    @Test
    void testUsersObjectCreation() {
        Users user = new Users();

        assertNotNull(user);
        assertNull(user.getUser_id());
        assertNull(user.getName());
        assertNull(user.getEmail());
        assertNull(user.getPassword());
    }
}