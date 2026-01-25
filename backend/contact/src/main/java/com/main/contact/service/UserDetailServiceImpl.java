package com.main.contact.service;
//
import com.main.contact.entity.User;
import com.main.contact.entity.UserPrincipal;
import com.main.contact.repository.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//@Component
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserInterface userrepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userrepo.findByEmail(username);
        if (user==null){
            throw new UsernameNotFoundException("user not found");
        }

        return new UserPrincipal();
    }
}
