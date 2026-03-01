package in.cs.main.controller;

import in.cs.main.dto.AuthRequest;
import in.cs.main.dto.ChangePasswordRequest;
import in.cs.main.entity.Users;
import in.cs.main.service.JWTService;
import in.cs.main.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private final UserService service;

    private final AuthenticationManager authenticationManager;

    private final   JWTService jwtService;


    @PostMapping("/register")
    public Users createUSer(@RequestBody Users user){
        return service.register(user);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

           Users user = service.findByEmail(loginRequest.getEmail()); // fetch user info
            String token = jwtService.generateToken(user.getEmail());


            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
    @GetMapping("/profile")
    public Users getProfile(Authentication authentication) {
        return service.getCurrentUser(authentication);
    }

    @PutMapping("/profile")
    public Users updateProfile(@RequestBody Users updatedUser,
                              Authentication authentication) {
        return service.updateCurrentUser(updatedUser, authentication);
    }
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication) {

        service.changePassword(request.getNewPassword(), authentication);
        return ResponseEntity.ok("Password updated successfully");
    }
}



