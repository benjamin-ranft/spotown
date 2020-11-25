package de.benjaminranft.spotown.controller;

import de.benjaminranft.spotown.dto.AddDiscoveryDto;
import de.benjaminranft.spotown.dto.UpdateDiscoveryDto;
import de.benjaminranft.spotown.model.Discovery;
import de.benjaminranft.spotown.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @PutMapping("{discoveryId}")
    public Discovery updateDiscovery (@RequestBody UpdateDiscoveryDto updateDiscoveryDto, @PathVariable String discoveryId, Principal principal){
        if (!discoveryId.equals(updateDiscoveryDto.getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return userService.update(updateDiscoveryDto, principal.getName());
    }

    @DeleteMapping("{discoveryId}")
    public void deleteDiscovery (@PathVariable String discoveryId, Principal principal){
        userService.remove(discoveryId, principal.getName());
    }


}
