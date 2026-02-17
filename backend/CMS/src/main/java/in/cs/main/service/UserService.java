package in.cs.main.service;//package in.cs.main.service;
//
//import lombok.RequiredArgsConstructor;
//
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Service;
//
//import in.cs.main.entity.Users;
//import in.cs.main.repository.UserRepository;
//import in.cs.main.exception.*;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//
//public class UserService {
//
//    private  UserRepository userRepository;
//    private static final Logger log =
//            LoggerFactory.getLogger(UserService.class);
//
//    // Get all users
//    public List<Users> getAllUsers() {
//        log.info("Fetching all users");
//        return userRepository.findAll();
//    }
//
//    // Get user by ID
//    public Users getUserById(Long id) {
//        log.info("Fetching user with id: {}", id);
//
//        return userRepository.findById(id)
//                .orElseThrow(() -> {
//                    log.error("User not found with id: {}", id);
//                    return new ResourceNotFoundException("User not found with id: " + id);
//                });
//    }
//
//    // Create new user
//    public Users createUser(Users user) {
//        log.info("Creating user with email: {}", user.getEmail());
//
//        return userRepository.save(user);
//    }
//
//    // Update user
//    public Users updateUser(Long id, Users updatedUser) {
//        log.info("Updating user with id: {}", id);
//
//        Users existingUser = getUserById(id);
//
//        existingUser.setFirstName(updatedUser.getFirstName());
//        existingUser.setLastName(updatedUser.getLastName());
//        existingUser.setEmail(updatedUser.getEmail());
//        existingUser.setPhone(updatedUser.getPhone());
//
//        return userRepository.save(existingUser);
//    }
//
//    // Change password
//    public Users changePassword(Long id, String newPassword) {
//        log.info("Changing password for user id: {}", id);
//
//        Users user = getUserById(id);
//
//        user.setPassword(newPassword);
//
//        return userRepository.save(user);
//    }
//
//    // Delete user
//    public void deleteUser(Long id) {
//        log.info("Deleting user with id: {}", id);
//
//        if (!userRepository.existsById(id)) {
//            log.error("Cannot delete. User not found with id: {}", id);
//            throw new ResourceNotFoundException("User not found with id: " + id);
//        }
//
//        userRepository.deleteById(id);
//    }
//}

import in.cs.main.entity.Users;
import in.cs.main.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.management.remote.JMXAuthenticator;

public class UserService {


    private UserRepository repo;

     private JWTService jwtService;
    private AuthenticationManager authManager;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users register(Users user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return user;
    }

    public String verify(Users user) {

        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getEmail());
        } else {
            return "fail";
        }
    }
}