package de.benjaminranft.spotown.service;

import de.benjaminranft.spotown.dao.UserDao;
import de.benjaminranft.spotown.dto.AddDiscoveryDto;
import de.benjaminranft.spotown.model.Discovery;
import de.benjaminranft.spotown.model.User;
import de.benjaminranft.spotown.utils.IdUtils;
import de.benjaminranft.spotown.utils.TimestampUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserDao userDao;
    private final TimestampUtils timestampUtils;
    private final IdUtils idUtils;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public UserService(UserDao userDao, TimestampUtils timestampUtils, IdUtils idUtils, MongoTemplate mongoTemplate) {
        this.userDao = userDao;
        this.timestampUtils = timestampUtils;
        this.idUtils = idUtils;
        this.mongoTemplate = mongoTemplate;
    }

    public List<Discovery> getDiscoveries( String username){
        Optional<User> user = userDao.findById(username);
        if(user.isPresent()){
            return user.get().getDiscoveries();
        }
        throw new UsernameNotFoundException(username+" not found");
    }

    public Discovery add(AddDiscoveryDto discoveryToBeAdded, String principalName) {
        Discovery discoveryObjectToBeSaved = Discovery.builder()
                .id( idUtils.generateId() )
                .timestamp(timestampUtils.generateTimestampEpochSeconds())
                .name(discoveryToBeAdded.getName())
                .address(discoveryToBeAdded.getAddress())
                .webUrl(discoveryToBeAdded.getWebUrl())
                .phoneNumber(discoveryToBeAdded.getPhoneNumber())
                .notes(discoveryToBeAdded.getNotes())
                .tags(discoveryToBeAdded.getTags())
                .build();

        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(principalName));

        Update update = new Update();
        update.addToSet("discoveries",discoveryObjectToBeSaved);

        mongoTemplate.updateFirst(query,update,User.class);

        return discoveryObjectToBeSaved;

    }


}
