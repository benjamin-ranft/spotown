package de.benjaminranft.spotown.controller;

import de.benjaminranft.spotown.dao.UserDao;
import de.benjaminranft.spotown.dto.AddDiscoveryDto;
import de.benjaminranft.spotown.dto.LoginDto;
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
                                new Discovery("5624", timestamp, "Ramen Place", "Sample Street 1", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes",
                                        new ArrayList<>(List.of("food", "art"))),
                                new Discovery("5634", timestamp, "Pasta Place", "Sample Street 2", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes",
                                        new ArrayList<>(List.of("food", "art")))
                        ))
                ),
                new User(
                        "heinz",
                        passwordHeinz,
                        new ArrayList<>(List.of(
                                new Discovery("123", timestamp, "Pizza Place", "Sample Street 3", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes",
                                        new ArrayList<>(List.of("nature", "art"))),
                                new Discovery("456", timestamp, "Sushi Place", "Sample Street 4", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes",
                                        new ArrayList<>(List.of("drink", "nature")))
                        ))
                )
        ));
    }

        private String backendAccessLink(){
            return "http://localhost:" + port + "/api/discoveries";}

        private String login(){
            ResponseEntity<String> response = testRestTemplate.postForEntity("http://localhost:" + port + "/auth/login", new LoginDto(
                    "heinz", "kunz"
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
@DisplayName("The getDiscoveries method should return the correct discovery list")
public void  getDiscoveriesTest(){

        //GIVEN
        String url = backendAccessLink();

        //WHEN
        HttpEntity<Void> entity = getValidAuthorizationEntity(null);
        ResponseEntity<Discovery[]> response = testRestTemplate.exchange(url, HttpMethod.GET, entity, Discovery[].class);

        List<Discovery> expectedList = new ArrayList<>(List.of(
                new Discovery("123", Instant.parse("2020-11-18T18:35:24.00Z"), "Pizza Place", "Sample Street 3", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes",
                        new ArrayList<>(List.of("nature", "art"))),
                new Discovery("456", Instant.parse("2020-11-18T18:35:24.00Z"), "Sushi Place", "Sample Street 4", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes",
                        new ArrayList<>(List.of("drink", "nature")))

        ));

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(expectedList.toArray()));
    }

    @Test
    @DisplayName("The add method should add a Discovery to User and return the added Discovery Object")
    public void add(){

        //GIVEN
        String url = backendAccessLink();

        AddDiscoveryDto addDiscoveryDto = new AddDiscoveryDto(
                "Fun Discovery", "Fun address Str. 12, 20253 Hamburg", "https://google.com", "345678976543", "Fun notes fun notes fun notes fun notes", new ArrayList<>(
                        List.of("restaurant","art"))
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
                        new Discovery("123", expectedTimestamp, "Pizza Place", "Sample Street 3", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes",
                                new ArrayList<>(List.of("nature", "art"))),
                        new Discovery("456", expectedTimestamp, "Sushi Place", "Sample Street 4", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes",
                                new ArrayList<>(List.of("drink", "nature"))),
                        new Discovery(
                                "1234", expectedTimestamp, "Fun Discovery", "Fun address Str. 12, 20253 Hamburg",null, null, "345678976543", "https://google.com", null, "Fun notes fun notes fun notes fun notes", new ArrayList<>(
                                List.of("restaurant","art"))

        )))));

        Discovery expectedDiscovery = new Discovery(
                "1234", expectedTimestamp, "Fun Discovery", "Fun address Str. 12, 20253 Hamburg",null, null, "345678976543", "https://google.com", null, "Fun notes fun notes fun notes fun notes", new ArrayList<>(
                List.of("restaurant","art"))
        );

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(expectedDiscovery));
        assertThat(updatedUser, is(expectedUser));
    }
}


