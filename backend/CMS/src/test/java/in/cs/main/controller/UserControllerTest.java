
package in.cs.main.controller;

import in.cs.main.dto.AuthRequest;
import in.cs.main.dto.ChangePasswordRequest;
import in.cs.main.entity.Users;
import in.cs.main.service.JWTService;
import in.cs.main.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService service;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JWTService jwtService;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private UserController controller;

    private Users user;

    @BeforeEach
    void setup() {
        user = new Users();
        user.setEmail("test@example.com");
        user.setPassword("password");
    }

    // ================= REGISTER =================

    @Test
    void testRegister() {
        when(service.register(user)).thenReturn(user);

        Users result = controller.createUSer(user);

        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
        verify(service).register(user);
    }

    // ================= LOGIN SUCCESS =================

    @Test
    void testLogin_Success() {
        AuthRequest request = new AuthRequest();
        request.setEmail("test@example.com");
        request.setPassword("password");

        when(authenticationManager.authenticate(any()))
                .thenReturn(authentication);

        when(service.findByEmail("test@example.com"))
                .thenReturn(user);

        when(jwtService.generateToken("test@example.com"))
                .thenReturn("mocked-jwt-token");

        ResponseEntity<?> response = controller.login(request);

        assertEquals(200, response.getStatusCode().value());

        Map<String, Object> body =
                (Map<String, Object>) response.getBody();

        assertEquals("mocked-jwt-token", body.get("token"));
        assertEquals(user, body.get("user"));

        verify(authenticationManager).authenticate(any());
        verify(jwtService).generateToken("test@example.com");
    }

    // ================= LOGIN FAILURE =================

    @Test
    void testLogin_Failure() {
        AuthRequest request = new AuthRequest();
        request.setEmail("wrong@example.com");
        request.setPassword("wrong");

        when(authenticationManager.authenticate(any()))
                .thenThrow(new RuntimeException("Bad credentials"));

        ResponseEntity<?> response = controller.login(request);

        assertEquals(401, response.getStatusCode().value());
        assertEquals("Invalid credentials", response.getBody());
    }

    // ================= GET PROFILE =================

    @Test
    void testGetProfile() {
        when(service.getCurrentUser(authentication))
                .thenReturn(user);

        Users result = controller.getProfile(authentication);

        assertEquals(user, result);
        verify(service).getCurrentUser(authentication);
    }

    // ================= UPDATE PROFILE =================

    @Test
    void testUpdateProfile() {
        Users updated = new Users();
        updated.setEmail("updated@example.com");

        when(service.updateCurrentUser(updated, authentication))
                .thenReturn(updated);

        Users result =
                controller.updateProfile(updated, authentication);

        assertEquals("updated@example.com", result.getEmail());
        verify(service).updateCurrentUser(updated, authentication);
    }

    // ================= CHANGE PASSWORD =================

    @Test
    void testChangePassword() {
        ChangePasswordRequest request =
                new ChangePasswordRequest();
        request.setNewPassword("newPassword");

        doNothing().when(service)
                .changePassword("newPassword", authentication);

        ResponseEntity<?> response =
                controller.changePassword(request, authentication);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Password updated successfully",
                response.getBody());

        verify(service)
                .changePassword("newPassword", authentication);
    }
}