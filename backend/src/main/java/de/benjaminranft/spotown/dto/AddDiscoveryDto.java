package de.benjaminranft.spotown.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddDiscoveryDto {
    private String name;
    private String place_id;
    private String lat;
    private String lng;
    private String address;
    private String thumbnail;
    private String phoneNumber;
    private String webUrl;
    private String directions;
    private String notes;
    private List<String> tags;
}
