package in.cs.main.service;

import in.cs.main.entity.Users;
import in.cs.main.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repo;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private UserService service;

    private Users user;

    @BeforeEach
    void setup() {
        user = new Users();
        user.setName("John");
        user.setEmail("john@example.com");
        user.setPassword("password");
    }

    // register

    @Test
    void testRegister() {
        when(repo.save(any(Users.class))).thenReturn(user);

        Users result = service.register(user);

        assertNotNull(result);
        assertNotEquals("password", result.getPassword());

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        assertTrue(encoder.matches("password", result.getPassword()));

        verify(repo).save(user);
    }

    // findbyemail

    @Test
    void testFindByEmail() {
        when(repo.findByEmail("john@example.com"))
                .thenReturn(user);

        Users result = service.findByEmail("john@example.com");

        assertEquals(user, result);
    }

    //getcurentuser

    @Test
    void testGetCurrentUser_Success() {
        when(authentication.getName())
                .thenReturn("john@example.com");

        when(repo.findByEmail("john@example.com"))
                .thenReturn(user);

        Users result = service.getCurrentUser(authentication);

        assertEquals(user, result);
    }

    @Test
    void testGetCurrentUser_NotFound() {
        when(authentication.getName())
                .thenReturn("john@example.com");

        when(repo.findByEmail("john@example.com"))
                .thenReturn(null);

        assertThrows(UsernameNotFoundException.class,
                () -> service.getCurrentUser(authentication));
    }

    //updateuser

    @Test
    void testUpdateCurrentUser_Success() {
        Users updated = new Users();
        updated.setName("Updated");
        updated.setEmail("updated@example.com");

        when(authentication.getName())
                .thenReturn("john@example.com");

        when(repo.findByEmail("john@example.com"))
                .thenReturn(user);

        when(repo.save(any(Users.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Users result =
                service.updateCurrentUser(updated, authentication);

        assertEquals("Updated", result.getName());
        assertEquals("updated@example.com", result.getEmail());

        verify(repo).save(user);
    }

    @Test
    void testUpdateCurrentUser_NotFound() {
        when(authentication.getName())
                .thenReturn("john@example.com");

        when(repo.findByEmail("john@example.com"))
                .thenReturn(null);

        Users updated = new Users();

        assertThrows(UsernameNotFoundException.class,
                () -> service.updateCurrentUser(updated, authentication));
    }

    // paswordchange

    @Test
    void testChangePassword_Success() {
        when(authentication.getName())
                .thenReturn("john@example.com");

        when(repo.findByEmail("john@example.com"))
                .thenReturn(user);

        service.changePassword("newPassword", authentication);

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        assertTrue(encoder.matches("newPassword", user.getPassword()));

        verify(repo).save(user);
    }

    @Test
    void testChangePassword_NotFound() {
        when(authentication.getName())
                .thenReturn("john@example.com");

        when(repo.findByEmail("john@example.com"))
                .thenReturn(null);

        assertThrows(UsernameNotFoundException.class,
                () -> service.changePassword("newPassword", authentication));
    }
}
