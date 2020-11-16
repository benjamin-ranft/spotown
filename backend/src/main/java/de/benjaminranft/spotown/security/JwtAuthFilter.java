package de.benjaminranft.spotown.security;

import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Service
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    public JwtAuthFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {

        // get token
        String authorization = httpServletRequest.getHeader("Authorization");
        if (authorization == null || authorization.isBlank()) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        // validate token
        String token = authorization.replace("Bearer ", "").trim();
        Claims claims = jwtUtils.parseToken(token);
        try {
            if (jwtUtils.isValid(claims)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        claims.getSubject(),
                        "",
                        Collections.emptyList());
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                System.out.println(usernamePasswordAuthenticationToken);
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        filterChain.doFilter(httpServletRequest,httpServletResponse);
    }


}
