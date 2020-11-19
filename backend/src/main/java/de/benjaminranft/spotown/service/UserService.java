package de.benjaminranft.spotown.service;

import de.benjaminranft.spotown.dao.UserDao;
import de.benjaminranft.spotown.model.Discovery;
import de.benjaminranft.spotown.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserDao userDao;

    @Autowired
    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }

    public List<Discovery> getDiscoveries( String username){
        Optional<User> user = userDao.findById(username);
        if(user.isPresent()){
            return user.get().getDiscoveries();
        }
        throw new UsernameNotFoundException(username+" not found");
    }


}
