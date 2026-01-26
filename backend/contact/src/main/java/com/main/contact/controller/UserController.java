package com.main.contact.controller;

import com.main.contact.entity.User;
import com.main.contact.service.ServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private ServiceImpl service;

    @PostMapping
    public ResponseEntity<User> registerUser(@RequestBody User user){
        return ResponseEntity.ok().body(service.register(user));
    }

    @GetMapping
    public List<User> getUser(User user){
        return service.getAllUsers(user);
    }

//    @PostMapping("/user")
//    public ResponseEntity<User> createUser(@RequestBody User user){
//        return ResponseEntity.ok().body(service.createUser(user));
//    }

    @GetMapping("/token")
    public CsrfToken getToken(HttpServletRequest request){
        return (CsrfToken) request.getAttribute("_csrf");
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUSer(@PathVariable int id){
        return ResponseEntity.ok().body(service.getUser(id));
    }

    @PostMapping("/login")
    public User login(@RequestBody User user){
        return service.loginuser(user.getEmail(), user.getPassword());

    }
    @DeleteMapping
    public void delete(User user){
        service.deleteUser(user.getId());
    }
    //    @PutMapping
//    public ResponseEntity<?> updateUser(@RequestBody User user){
//     Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
//        String username=authentication.getName();
//        User user1=service.findByUserName(username);
//        if (user1!=null){
//            user1.setName(user.getName());
//            user1.setEmail(user.getEmail());
//            user1.setPassword(user.getPassword());
//            service.createUser(user1);
//        }
//         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}
