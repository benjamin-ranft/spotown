package de.benjaminranft.spotown.service;

import com.mongodb.BasicDBObject;
import de.benjaminranft.spotown.dao.UserDao;
import de.benjaminranft.spotown.dto.AddDiscoveryDto;
import de.benjaminranft.spotown.dto.UpdateDiscoveryDto;
import de.benjaminranft.spotown.model.Discovery;
import de.benjaminranft.spotown.model.User;
import de.benjaminranft.spotown.utils.IdUtils;
import de.benjaminranft.spotown.utils.TimestampUtils;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    final IdUtils idUtils = mock(IdUtils.class);
    final TimestampUtils timestampUtils = mock(TimestampUtils.class);
    final UserDao userDao = mock(UserDao.class);
    MongoTemplate mongoTemplate = mock(MongoTemplate.class);
    final UserService userService = new UserService(userDao, timestampUtils, idUtils, mongoTemplate);

    @Test
    @DisplayName("The get method should return user's discovery list")
    void getDiscoveriesTest() {

        //GIVEN
        String principalName = "benjamin";
        Instant timestamp = Instant.parse("2020-10-26T10:00:00Z");

        User user = new User(
                "benjamin",
                "password",
                new ArrayList<>(List.of(
                        new Discovery("5624", timestamp,
                                "Pizza Place",
                                "GHSF1KIUHKJ",
                                "34905480395232",
                                "565774534",
                                "Sample Street 1",
                                "https://google.com",
                                "04023457596",
                                "https://google.com",
                                "https://google.com",
                                "Sample notes sample notes sample notes",
                                List.of(
                                        "food", "art")
                        ),
                        new Discovery("2345", timestamp,
                                "Sushi Place",
                                "GHSF4KIUHKJ",
                                "34905480395232",
                                "565774534",
                                "Sample Street 2",
                                "https://google.com",
                                "04023457596",
                                "https://google.com",
                                "https://google.com",
                                "Sample notes sample notes sample notes",
                                List.of(
                                        "drinks", "nature")
                        )))
        );

        //WHEN
        when(userDao.findById(principalName)).thenReturn(Optional.of(user));
        List<Discovery> discoveryList = userService.getDiscoveries(principalName);

        List<Discovery> expectedList = new ArrayList<>(List.of(
                new Discovery("5624", timestamp,
                        "Pizza Place",
                        "GHSF1KIUHKJ",
                        "34905480395232",
                        "565774534",
                        "Sample Street 1",
                        "https://google.com",
                        "04023457596",
                        "https://google.com",
                        "https://google.com",
                        "Sample notes sample notes sample notes",
                        List.of(
                                "food", "art")
                ),
                new Discovery("2345", timestamp,
                        "Sushi Place",
                        "GHSF4KIUHKJ",
                        "34905480395232",
                        "565774534",
                        "Sample Street 2",
                        "https://google.com",
                        "04023457596",
                        "https://google.com",
                        "https://google.com",
                        "Sample notes sample notes sample notes",
                        List.of(
                                "drinks", "nature")
                )
        ));

        //THEN
        assertThat(discoveryList, is(expectedList));
    }

    @Test
    @DisplayName("The add method should add Discovery object to discovery List and return the added Discovery")
    void addTest() {

        //GIVEN
        String principalName = "benjamin";
        Query query = Query.query(
                (Criteria.where("username").is("benjamin"))
        );
        String expectedId = "1234";
        Instant expectedTime = Instant.parse("2020-10-26T10:00:00Z");
        Update update = new Update();

        AddDiscoveryDto addDiscoveryDto = new AddDiscoveryDto(
                "Sushi Place",
                "GHSF4KIUHKJ",
                "34905480395232",
                "565774534",
                "Sample Street 2",
                "https://google.com",
                "04023457596",
                "https://google.com",
                "https://google.com",
                "Sample notes sample notes sample notes",
                new ArrayList<>(List.of("drinks", "nature"))

        );

        //WHEN
        when(idUtils.generateId()).thenReturn(expectedId);
        when(timestampUtils.generateTimestampEpochSeconds()).thenReturn(expectedTime);

        Discovery addedDiscovery = userService.add(addDiscoveryDto, principalName);
        Discovery expectedDiscovery = new Discovery(expectedId, expectedTime,"Sushi Place",
                "GHSF4KIUHKJ",
                "34905480395232",
                "565774534",
                "Sample Street 2",
                "https://google.com",
                "04023457596",
                "https://google.com",
                "https://google.com",
                "Sample notes sample notes sample notes",
                List.of(
                        "drinks", "nature")

        );

        //THEN
        assertThat(addedDiscovery, is(expectedDiscovery));
        verify(mongoTemplate).updateFirst(query, update.addToSet("discoveries", expectedDiscovery), User.class);

    }

    @Test
    @DisplayName("The update method should update Discovery object by Id return the added Discovery")
    void updateTest() {

        //GIVEN
        String principalName = "benjamin";
        Query query = new Query(new Criteria().andOperator(
                Criteria.where("username").is("benjamin"),
                Criteria.where("discoveries").elemMatch(Criteria.where("_id").is("1234")))
        );
        String expectedId = "1234";
        Instant expectedTime = Instant.parse("2020-10-26T10:00:00Z");
        Update update = new Update();

        UpdateDiscoveryDto updatedDiscoveryDto = new UpdateDiscoveryDto(
                expectedId, "Sushi Place",
                "GHSF4KIUHKJ",
                "34905480395232",
                "565774534",
                "Sample Street 2",
                "https://google.com",
                "04023457596",
                "https://google.com",
                "https://google.com",
                "Sample notes sample notes sample notes",
                new ArrayList<>(List.of("restaurant", "gallery"))
        );

        //WHEN
        when(idUtils.generateId()).thenReturn(expectedId);
        when(timestampUtils.generateTimestampEpochSeconds()).thenReturn(expectedTime);

        Discovery updatedDiscovery = userService.update(updatedDiscoveryDto, principalName);
        Discovery expectedDiscovery = new Discovery(expectedId, expectedTime, "Sushi Place",
                "GHSF4KIUHKJ",
                "34905480395232",
                "565774534",
                "Sample Street 2",
                "https://google.com",
                "04023457596",
                "https://google.com",
                "https://google.com",
                "Sample notes sample notes sample notes",
                new ArrayList<>(List.of("restaurant", "gallery"))
        );

        //THEN
        assertThat(updatedDiscovery, is(expectedDiscovery));
        verify(mongoTemplate).updateFirst(query, update.set("discoveries.$", expectedDiscovery), User.class);
    }

    @Test
    @DisplayName("The delete method should delete Discovery object of the desired Id")
    void deleteTest() {

        //GIVEN
        String idToDelete = "1234";
        String principalName = "benjamin";
        Query query = new Query(new Criteria().andOperator(
                Criteria.where("username").is("benjamin"),
                Criteria.where("discoveries").elemMatch(Criteria.where("_id").is("1234")))
        );

        Update update = new Update();

        //WHEN
        userService.remove(idToDelete, principalName);

        //THEN
        verify(mongoTemplate).updateFirst(query, update.pull("discoveries", new BasicDBObject("_id", idToDelete)), User.class);

    }
}