package de.benjaminranft.spotown.seeder;

import de.benjaminranft.spotown.model.Discovery;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class DiscoverySeeder {

    private static final Instant timestamp = Instant.parse("2020-10-26T10:00:00Z");


    private static final List<Discovery> discoveries = new ArrayList<>(
            List.of(
                    new Discovery("5624", timestamp, "Pizza Place", "Sample Street 1", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes", List.of(
                            "restaurant", "gallery")
                    ),
                    new Discovery("5634", timestamp, "Pizza Place", "Sample Street 1", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes", List.of(
                    "restaurant", "gallery")
            )));

    public static List<Discovery> getDiscoveries(){
        return discoveries;
    }
}
