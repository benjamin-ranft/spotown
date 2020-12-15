package de.benjaminranft.spotown.controller;

import de.benjaminranft.spotown.dao.UserDao;
import de.benjaminranft.spotown.dto.AddDiscoveryDto;
import de.benjaminranft.spotown.dto.LoginDto;
import de.benjaminranft.spotown.dto.UpdateDiscoveryDto;
import de.benjaminranft.spotown.model.Discovery;
import de.benjaminranft.spotown.model.User;
import de.benjaminranft.spotown.utils.IdUtils;
import de.benjaminranft.spotown.utils.TimestampUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.TestPropertySource;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {"jwt.secretkey=somesecrettoken"})
public class DiscoveryControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @MockBean
    private IdUtils idUtils;

    @MockBean
    private TimestampUtils timestampUtils;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserDao userDao;

    @BeforeEach
    public void setUpDb() {
        Instant timestamp = Instant.parse("2020-11-18T18:35:24.00Z");
        String passwordBenjamin = new BCryptPasswordEncoder().encode("password");
        String passwordHeinz = "$2a$10$0HZGmicEH786L.HeSIjhOuvIK3ixlYij4luVHBNAUtXqKus79t/FS";
        userDao.deleteAll();
        userDao.saveAll(List.of(
                new User(
                        "benjamin",
                        passwordBenjamin,
                        new ArrayList<>(List.of(
                                new Discovery("5624", timestamp, "Sushi Place",
                                        "GHSF4KIUHKJ",
                                        349054803.95232,
                                        565774534,
                                        "Sample Street 2",
                                        "https://google.com",
                                        "04023457596",
                                        "https://google.com",
                                        "https://google.com",
                                        "Sample notes sample notes sample notes",
                                        new ArrayList<>(List.of("drinks", "nature"))
                                ),
                                new Discovery("5634", timestamp, "Pizza Place",
                                        "GHSF1KIUHKJ",
                                        349054803.95232,
                                        565774534,
                                        "Sample Street 1",
                                        "https://google.com",
                                        "04023457596",
                                        "https://google.com",
                                        "https://google.com",
                                        "Sample notes sample notes sample notes",
                                        new ArrayList<>(List.of("food", "art")))
                        )
                )),

                new User(
                        "heinz",
                        passwordHeinz,
                        new ArrayList<>(List.of(
                                new Discovery("123", timestamp, "Bread Place",
                                        "GHSF4KIUHKJ",
                                        349054803.95232,
                                        565774534,
                                        "Sample Street 2",
                                        "https://google.com",
                                        "04023457596",
                                        "https://google.com",
                                        "https://google.com",
                                        "Sample notes sample notes sample notes",
                                        new ArrayList<>(List.of("drinks", "nature"))
                                ),
                                new Discovery("456", timestamp, "Burger Place",
                                        "GHSF1KIUHKJ",
                                        349054803.95232,
                                        565774534,
                                        "Sample Street 1",
                                        "https://google.com",
                                        "04023457596",
                                        "https://google.com",
                                        "https://google.com",
                                        "Sample notes sample notes sample notes",
                                        new ArrayList<>(List.of("food", "art")))
                        ))
        )));
    }

        private String backendAccessLink(){
            return "http://localhost:" + port + "/api/discoveries";}

        private String login(){
            ResponseEntity<String> response = testRestTemplate.postForEntity("http://localhost:" + port + "/auth/login", new LoginDto(
                    "heinz", "password"
            ), String.class);

            return response.getBody();
        }

        private <T> HttpEntity<T> getValidAuthorizationEntity(T data){
            String token =login();

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(token);
            return new HttpEntity<>(data, headers);
}

@Test
@DisplayName("The getDiscoveries method should return the correct discoveryList")
public void  getDiscoveriesTest(){

        //GIVEN
        String url = backendAccessLink();

        //WHEN
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<Discovery[]> response = testRestTemplate.exchange(url, HttpMethod.GET, entity, Discovery[].class);

        List<Discovery> expectedList = new ArrayList<>(List.of(
                new Discovery("123", Instant.parse("2020-11-18T18:35:24.00Z"), "Bread Place",
                        "GHSF4KIUHKJ",
                        349054803.95232,
                        565774534,
                        "Sample Street 2",
                        "https://google.com",
                        "04023457596",
                        "https://google.com",
                        "https://google.com",
                        "Sample notes sample notes sample notes",
                        new ArrayList<>(List.of("drinks", "nature"))
                ),
                new Discovery("456", Instant.parse("2020-11-18T18:35:24.00Z"), "Burger Place",
                        "GHSF1KIUHKJ",
                        349054803.95232,
                        565774534,
                        "Sample Street 1",
                        "https://google.com",
                        "04023457596",
                        "https://google.com",
                        "https://google.com",
                        "Sample notes sample notes sample notes",
                        new ArrayList<>(List.of("food", "art"))
                )
        )
        );

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(expectedList.toArray()));
    }

    @Test
    @DisplayName("The add method should add a Discovery to User and return the added Discovery Object")
    public void add(){

        //GIVEN
        String url = backendAccessLink();

        AddDiscoveryDto addDiscoveryDto = new AddDiscoveryDto(
                "Sushi Place",
                "GHSF4KIUHKJ",
                349054803.95232,
                565774534,
                "Sample Street 2",
                "https://google.com",
                "04023457596",
                "https://google.com",
                "https://google.com",
                "Sample notes sample notes sample notes",
                new ArrayList<>(List.of("restaurant", "gallery"))

        );

        //WHEN
        when(idUtils.generateId()).thenReturn("1234");
        when(timestampUtils.generateTimestampEpochSeconds()).thenReturn(Instant.parse("2020-11-18T18:35:24.00Z"));

        HttpEntity<AddDiscoveryDto> entity = getValidAuthorizationEntity(addDiscoveryDto);
        ResponseEntity<Discovery> response = testRestTemplate.exchange(url, HttpMethod.POST, entity, Discovery.class);

        Instant expectedTimestamp = Instant.parse("2020-11-18T18:35:24.00Z");
        Object updatedUser = userDao.findById("heinz");
        Object expectedUser = Optional.of(new User(
                "heinz",
                "$2a$10$0HZGmicEH786L.HeSIjhOuvIK3ixlYij4luVHBNAUtXqKus79t/FS",
                new ArrayList<>(List.of(
                        new Discovery("123", expectedTimestamp, "Bread Place",
                                "GHSF4KIUHKJ",
                                349054803.95232,
                                565774534,
                                "Sample Street 2",
                                "https://google.com",
                                "04023457596",
                                "https://google.com",
                                "https://google.com",
                                "Sample notes sample notes sample notes",
                                new ArrayList<>(List.of("drinks", "nature"))
                        ),
                        new Discovery("456", expectedTimestamp, "Burger Place",
                                "GHSF1KIUHKJ",
                                349054803.95232,
                                565774534,
                                "Sample Street 1",
                                "https://google.com",
                                "04023457596",
                                "https://google.com",
                                "https://google.com",
                                "Sample notes sample notes sample notes",
                                new ArrayList<>(List.of("food", "art"))
                        ),
                        new Discovery(
                                "1234", expectedTimestamp,
                                "Sushi Place",
                                "GHSF4KIUHKJ",
                                349054803.95232,
                                565774534,
                                "Sample Street 2",
                                "https://google.com",
                                "04023457596",
                                "https://google.com",
                                "https://google.com",
                                "Sample notes sample notes sample notes",
                                new ArrayList<>(List.of("restaurant", "gallery")))
                        )
                ))
        );

        Discovery expectedDiscovery = new Discovery(
                "1234", expectedTimestamp,
                "Sushi Place",
                "GHSF4KIUHKJ",
                349054803.95232,
                565774534,
                "Sample Street 2",
                "https://google.com",
                "04023457596",
                "https://google.com",
                "https://google.com",
                "Sample notes sample notes sample notes",
                new ArrayList<>(List.of("restaurant", "gallery"))
        );

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(expectedDiscovery));
        assertThat(updatedUser, is(expectedUser));
    }

    @Test
    @DisplayName("The update method should update a Discovery for indicated User and return the updated Discovery Object")
    public void updateDiscovery(){

        //GIVEN
        String url = backendAccessLink() + "/123";

        UpdateDiscoveryDto updatedDiscovery = new UpdateDiscoveryDto("123","Bread Place 99",
                "GHSF4KIUHKJ",
                349054803.95232,
                565774534,
                "Sample Street 2",
                "https://google.com",
                "04023457596",
                "https://google.com",
                "https://google.com",
                "Sample notes sample notes sample notes",
                new ArrayList<>(List.of("drinks", "nature"))
        );

        //WHEN
        when(timestampUtils.generateTimestampEpochSeconds()).thenReturn(Instant.parse("2020-11-18T18:35:24.00Z"));

        HttpEntity<UpdateDiscoveryDto> entity = getValidAuthorizationEntity(updatedDiscovery);
        ResponseEntity<Discovery> response = testRestTemplate.exchange(url, HttpMethod.PUT, entity, Discovery.class);

        Instant expectedTimestamp = Instant.parse("2020-11-18T18:35:24.00Z");
        Object updatedUser = userDao.findById("heinz");
        Object expectedUser = Optional.of(new User(
                "heinz",
                "$2a$10$0HZGmicEH786L.HeSIjhOuvIK3ixlYij4luVHBNAUtXqKus79t/FS",
                new ArrayList<>(List.of(
                        new Discovery("123", expectedTimestamp, "Bread Place 99",
                                "GHSF4KIUHKJ",
                                349054803.95232,
                                565774534,
                                "Sample Street 2",
                                "https://google.com",
                                "04023457596",
                                "https://google.com",
                                "https://google.com",
                                "Sample notes sample notes sample notes",
                                new ArrayList<>(List.of("drinks", "nature"))),
                        new Discovery("456", expectedTimestamp, "Burger Place",
                                "GHSF1KIUHKJ",
                                349054803.95232,
                                565774534,
                                "Sample Street 1",
                                "https://google.com",
                                "04023457596",
                                "https://google.com",
                                "https://google.com",
                                "Sample notes sample notes sample notes",
                                new ArrayList<>(List.of("food", "art")))
                        ))));

        Discovery expectedDiscovery = new Discovery(
                "123", expectedTimestamp, "Bread Place 99",
                "GHSF4KIUHKJ",
                349054803.95232,
                565774534,
                "Sample Street 2",
                "https://google.com",
                "04023457596",
                "https://google.com",
                "https://google.com",
                "Sample notes sample notes sample notes",
                new ArrayList<>(List.of("drinks", "nature"))
        );


        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(expectedDiscovery));
        assertThat(updatedUser, is(expectedUser));
    }

    @Test
    @DisplayName("The delete method should delete discovery by id and return status code 200")
    public void deleteByIdTest(){

        //GIVEN
        String url = backendAccessLink() + "/123";

        //WHEN
        Instant expectedTimestamp = Instant.parse("2020-11-18T18:35:24.00Z");
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<Void> response = testRestTemplate.exchange(url, HttpMethod.DELETE, entity, Void.class);

        Object updatedUser = userDao.findById("heinz");
        Object expectedUser = Optional.of(new User(
                "heinz",
                "$2a$10$0HZGmicEH786L.HeSIjhOuvIK3ixlYij4luVHBNAUtXqKus79t/FS",
                new ArrayList<>(List.of(
                        new Discovery("456", expectedTimestamp, "Burger Place",
                                "GHSF1KIUHKJ",
                                349054803.95232,
                                565774534,
                                "Sample Street 1",
                                "https://google.com",
                                "04023457596",
                                "https://google.com",
                                "https://google.com",
                                "Sample notes sample notes sample notes",
                                new ArrayList<>(List.of("food", "art")))
                        ))));

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        boolean discoveryPresent = userDao.findById("123").isPresent();
        assertThat(discoveryPresent, is(false));
        assertThat(updatedUser, is(expectedUser));
    }

}


