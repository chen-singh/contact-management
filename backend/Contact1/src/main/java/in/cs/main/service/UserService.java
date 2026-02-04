package in.cs.main.service;

import in.cs.main.entities.Users;
import in.cs.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

public class UserService {

  @Autowired
  private UserRepository userrepo;

  @Autowired
    PasswordEncoder passwordEncoder;
    public Users register(Users user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userrepo.save(user);

    }

    public List<Users> getAllUsers(Users user){

        return  userrepo.findAll();
    }


    public Users getUser(Long id){
        return userrepo.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
    }
}
