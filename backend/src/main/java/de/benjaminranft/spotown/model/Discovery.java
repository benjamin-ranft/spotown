package de.benjaminranft.spotown.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Discovery {
    private String id;
    private Instant timestamp;
    private String name;
    private String address;
    private String thumbnail;
    private String openingHours;
    private String phoneNumber;
    private String webUrl;
    private String directions;
    private String notes;
    private List<String> tags;
}