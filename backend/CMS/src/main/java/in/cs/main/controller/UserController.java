package in.cs.main.controller;

import in.cs.main.dto.AuthRequest;
import in.cs.main.entity.Users;
import in.cs.main.service.JWTService;
import in.cs.main.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController

@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService service;

    private final AuthenticationManager authenticationManager;

    private final   JWTService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtService.generateToken(request.getEmail());

        return ResponseEntity.ok(Map.of("token", token));
    }
    @PostMapping("/register")
    public Users createUSer(@RequestBody Users user){
        return service.register(user);
    }
}



