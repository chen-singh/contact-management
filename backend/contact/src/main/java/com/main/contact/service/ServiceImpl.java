package com.main.contact.service;

import com.main.contact.entity.Contact;
import com.main.contact.entity.User;
import com.main.contact.repository.CrudRepository;
import com.main.contact.repository.UserInterface;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ServiceImpl {
    @Autowired
    private CrudRepository crudRepository;

    @Autowired
    private UserInterface userrepo;

//    @Autowired
//    PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    public Contact createContact(Contact contact) {
        return crudRepository.save(contact);
    }


    public Page<Contact> contactPage(int page, int size) {
        return crudRepository.findAll(PageRequest.of(page, size));
    }

    public Contact getContact(Long id) {
        return crudRepository.findById(id).orElseThrow(() -> new RuntimeException("contact not found"));
    }

    public void delete(Contact contact) {
        crudRepository.delete(contact);
    }


    public User register(User user) {
      return userrepo.save(user);

    }

    public User createUser(User user){
       // user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userrepo.save(user);
    }
    public User getUser(int id){
        return userrepo.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
    }

    public User loginuser(String email,String password) {
        User validuser=	userrepo.findByEmail(email);
        if(validuser!=null && validuser.getPassword().equals(password)) {
            return validuser;
        }
        return null;
    }

    public User findByUserName(String username) {
        return userrepo.findByEmail(username);
    }
}
