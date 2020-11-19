package de.benjaminranft.spotown.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddDiscoveryDto {
    private String id;
    private String timestamp;
    private String name;
    private String address;
    private String webUrl;
    private String phoneNumber;
    private String notes;
}
