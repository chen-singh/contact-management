package in.cs.main.controller;

import in.cs.main.dto.AuthRequest;
import in.cs.main.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

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
}





//@RestController
//@RequestMapping("/api/users")
//@CrossOrigin
//@RequiredArgsConstructor
//@Slf4j
//public class UserController {
//
//    @Autowired
//    private  UserRepository userRepository;
//
//    // Get all users
//    @GetMapping
//    public List<Users> getAllUsers() {
//        log.info("Fetching all users");
//        return userRepository.findAll();
//    }
//
//    // Get user by id
//    @GetMapping("/{id}")
//    public Users getUser(@PathVariable Long id) {
//        log.info("Fetching user with id: {}", id);
//        return userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//    }
//
//    // Create user
//    @PostMapping
//    public Users createUser(@RequestBody Users user) {
//        log.info("Creating new user with email: {}", user.getEmail());
//        return userRepository.save(user);
//    }
//
//    // Update user
//    @PutMapping("/{id}")
//    public Users updateUser(@PathVariable Long id,
//                           @RequestBody Users updatedUser) {
//
//        log.info("Updating user with id: {}", id);
//
//        Users user = userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//        user.setFirstName(updatedUser.getFirstName());
//        user.setLastName(updatedUser.getLastName());
//        user.setEmail(updatedUser.getEmail());
//        user.setPhone(updatedUser.getPhone());
//
//        return userRepository.save(user);
//    }
//
//
//    @PutMapping("/{id}/change-password")
//    public Users changePassword(@PathVariable Long id,
//                               @RequestParam String newPassword) {
//
//        log.info("Changing password for user id: {}", id);
//
//        Users user = userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//       user.setPassword(newPassword);
//
//        return userRepository.save(user);
//    }
//
//
//    @DeleteMapping("/{id}")
//    public void deleteUser(@PathVariable Long id) {
//        log.info("Deleting user with id: {}", id);
//
//        if (!userRepository.existsById(id)) {
//            throw new ResourceNotFoundException("User not found");
//        }
//
//        userRepository.deleteById(id);
//    }
//}
//
