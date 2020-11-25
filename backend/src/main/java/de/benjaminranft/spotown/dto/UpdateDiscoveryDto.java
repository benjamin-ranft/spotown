package de.benjaminranft.spotown.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class UpdateDiscoveryDto {
    private String id;
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
