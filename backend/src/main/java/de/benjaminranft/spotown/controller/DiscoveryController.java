package de.benjaminranft.spotown.controller;

import de.benjaminranft.spotown.dto.AddDiscoveryDto;
import de.benjaminranft.spotown.model.Discovery;
import de.benjaminranft.spotown.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/discoveries")
public class DiscoveryController {

    private final UserService userService;

    @Autowired
    public DiscoveryController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<Discovery> getDiscoveries(Principal principal){
        return userService.getDiscoveries(principal.getName());
    }

    @PostMapping
    public Discovery add(@RequestBody AddDiscoveryDto dto, Principal principal){
        return this.userService.add(dto, principal.getName());
    }
}
