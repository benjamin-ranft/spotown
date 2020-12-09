package de.benjaminranft.spotown.service;

import com.mongodb.BasicDBObject;
import de.benjaminranft.spotown.dao.UserDao;
import de.benjaminranft.spotown.dto.AddDiscoveryDto;
import de.benjaminranft.spotown.dto.UpdateDiscoveryDto;
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

import static org.springframework.data.mongodb.core.query.Criteria.where;

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
                .id(idUtils.generateId())
                .timestamp(timestampUtils.generateTimestampEpochSeconds())
                .name(discoveryToBeAdded.getName())
                .place_id(discoveryToBeAdded.getPlace_id())
                .lat(discoveryToBeAdded.getLat())
                .lng(discoveryToBeAdded.getLng())
                .address(discoveryToBeAdded.getAddress())
                .thumbnail(discoveryToBeAdded.getThumbnail())
                .phoneNumber(discoveryToBeAdded.getPhoneNumber())
                .webUrl(discoveryToBeAdded.getWebUrl())
                .directions(discoveryToBeAdded.getDirections())
                .notes(discoveryToBeAdded.getNotes())
                .tags(discoveryToBeAdded.getTags())
                .build();

        Query query = new Query();
        query.addCriteria(where("username").is(principalName));

        Update update = new Update();
        update.addToSet("discoveries",discoveryObjectToBeSaved);

        mongoTemplate.updateFirst(query,update,User.class);

        return discoveryObjectToBeSaved;
    }

    public Discovery update (UpdateDiscoveryDto discovery, String principalName){
        Discovery discoveryToBeUpdated = Discovery.builder()
                .id(discovery.getId())
                .timestamp(timestampUtils.generateTimestampEpochSeconds())
                .name(discovery.getName())
                .place_id(discovery.getPlace_id())
                .lat(discovery.getLat())
                .lng(discovery.getLng())
                .address(discovery.getAddress())
                .thumbnail(discovery.getThumbnail())
                .phoneNumber(discovery.getPhoneNumber())
                .webUrl(discovery.getWebUrl())
                .directions(discovery.getDirections())
                .notes(discovery.getNotes())
                .tags(discovery.getTags())
                .build();

        Query query = new Query(new Criteria().andOperator(
                where("username").is(principalName),
                where("discoveries").elemMatch(where("_id").is(discovery.getId()))
        ));

        Update update = new Update();
        update.set("discoveries.$", discoveryToBeUpdated);

        mongoTemplate.updateFirst(query, update, User.class);

        return discoveryToBeUpdated;
    }

    public void remove (String discoveryId, String principalName){
        Query query = new Query(new Criteria().andOperator(
                where("username").is(principalName),
                where("discoveries").elemMatch(where("_id").is(discoveryId))
        ));

        Update update = new Update();
        update.pull("discoveries", new BasicDBObject("_id", discoveryId));

        mongoTemplate.updateFirst(query, update, User.class);

    }
}
