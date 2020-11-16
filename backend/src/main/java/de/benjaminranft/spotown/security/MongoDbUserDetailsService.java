package de.benjaminranft.spotown.security;

import de.benjaminranft.spotown.dao.UserDao;
import de.benjaminranft.spotown.model.SpotownUser;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MongoDbUserDetailsService implements UserDetailsService {

    private final UserDao userDao;

    public MongoDbUserDetailsService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<SpotownUser> user = userDao.findById(username);

        if (user.isPresent()) {
            return new User(user.get().getUsername(), user.get().getPassword(), List.of()) {
            };
        }
        throw new UsernameNotFoundException("User does not exist");
    }
}
