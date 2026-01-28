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



    @GetMapping("/token")
    public CsrfToken getToken(HttpServletRequest request){
        return (CsrfToken) request.getAttribute("_csrf");
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUSer(@PathVariable int id){
        return ResponseEntity.ok().body(service.getUser(id));
    }


    @DeleteMapping
    public void delete(User user){
        service.deleteUser(user.getId());
    }
    @PostMapping("/login")
    public String log(@RequestBody User user){
        return service.verify(user);
    }
 
}
