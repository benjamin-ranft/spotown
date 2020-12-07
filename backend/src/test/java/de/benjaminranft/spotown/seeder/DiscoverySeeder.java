package de.benjaminranft.spotown.seeder;

import de.benjaminranft.spotown.model.Discovery;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class DiscoverySeeder {

    private static final Instant timestamp = Instant.parse("2020-10-26T10:00:00Z");


    private static final List<Discovery> discoveries = new ArrayList<>(
            List.of(
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

    public static List<Discovery> getDiscoveries(){
        return discoveries;
    }
}
