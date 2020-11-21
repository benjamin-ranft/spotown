package de.benjaminranft.spotown.utils;

import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class TimestampUtils {
    public Instant generateTimestampEpochSeconds() {
        return Instant.ofEpochSecond(Instant.now().getEpochSecond());
    }
}
