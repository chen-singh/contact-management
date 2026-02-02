package com.main.contact.service;

import com.main.contact.model.User;
import com.main.contact.repository.ContactRepository;
import com.main.contact.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ServiceImpl {
    @Autowired
    private ContactRepository crudRepository;

    @Autowired
    private UserRepository userrepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTAuthentication jwtAuthentication;


@Autowired
     private     PasswordEncoder passwordEncoder;



    public User register(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userrepo.save(user);

    }

    public List<User> getAllUsers(User user){
        return  userrepo.findAll();
    }

    public User createUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userrepo.save(user);
    }
    public User getUser(int id){
        return userrepo.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
    }
//
//    public User loginuser(String email,String password) {
//        User validuser=	userrepo.findByEmail(email);
//        if(validuser!=null && validuser.getPassword().equals(password)) {
//            return validuser;
//        }
//        return null;
//    }

    public void deleteUser(int id){
        userrepo.deleteById(id);
    }

    public User findByUserName(String username) {
        return userrepo.findByEmail(username);
    }


    public String verify(User user){
        Authentication  authentication= authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
        if (authentication.isAuthenticated()){

            return jwtAuthentication.generateToken(user.getEmail());
        }
        return "Fail";
    }
}
