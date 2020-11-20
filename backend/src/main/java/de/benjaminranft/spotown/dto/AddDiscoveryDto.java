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
    private String address;
    private String webUrl;
    private String phoneNumber;
    private String notes;
    private List<String> tags;
}
