package de.benjaminranft.spotown.controller;

import de.benjaminranft.spotown.model.Discovery;
import de.benjaminranft.spotown.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/discoveries")
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
}
