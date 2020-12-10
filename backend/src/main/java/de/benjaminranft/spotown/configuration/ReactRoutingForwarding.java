package de.benjaminranft.spotown.configuration;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactRoutingForwarding {
    @RequestMapping(value = "/(**^\\.well\\-known)/{[path:[^\\.]*}")
    public String forwardToRoutUrl() {
        return "forward:/";
    }
}