package de.benjaminranft.spotown.seeder;

import de.benjaminranft.spotown.model.Discovery;

import java.util.ArrayList;
import java.util.List;

public class DiscoverySeeder {
    private static final List<Discovery> discoveries = new ArrayList<>(
            List.of(
                    new Discovery("Pizza Place", "Sample Street 1", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes"),
                    new Discovery("Sushi Place", "Sample Street 2", "https://google.com", "11:00 - 12:00", "04023457596", "https://google.com", "https://google.com", "Sample notes sample notes sample notes")
            ));
    public static List<Discovery> getDiscoveries(){
        return discoveries;
    }
}
