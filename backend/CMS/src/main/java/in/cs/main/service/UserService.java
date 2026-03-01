package in.cs.main.service;

import in.cs.main.entity.Users;
import in.cs.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private UserRepository repo;


     private JWTService jwtService;
    private AuthenticationManager authManager;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users register(Users user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return user;
    }






    public Users findByEmail(String email ) {
        return repo.findByEmail(email);
    }

    public Users getCurrentUser(Authentication authentication) {

        String email = authentication.getName(); // usually email/username

        Users user= repo.findByEmail(email);
        if (user==null){
            throw new UsernameNotFoundException("User not found");
        }
        return user;

    }


    public Users updateCurrentUser(Users updatedUser,
                                  Authentication authentication) {

        String email = authentication.getName();

        Users existingUser = repo.findByEmail(email);
        if (existingUser==null){
            throw new UsernameNotFoundException("User not found");
        }


        existingUser.setName(updatedUser.getName());



        existingUser.setEmail(updatedUser.getEmail());

        return repo.save(existingUser);
    }


    public void changePassword(String newPassword, Authentication authentication) {

        String email = authentication.getName();

        Users user = repo.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        user.setPassword(encoder.encode(newPassword));
        repo.save(user);
    }
}