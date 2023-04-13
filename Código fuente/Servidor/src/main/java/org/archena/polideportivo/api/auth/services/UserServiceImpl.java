package org.archena.polideportivo.api.auth.services;

import org.archena.polideportivo.api.auth.dto.LoginDto;
import org.archena.polideportivo.api.auth.dto.SignupDto;
import org.archena.polideportivo.api.auth.dto.UserJwtDto;
import org.archena.polideportivo.api.auth.model.Role;
import org.archena.polideportivo.api.auth.model.User;
import org.archena.polideportivo.api.auth.repositories.UserRepository;
import org.archena.polideportivo.api.auth.security.JwtUtils;
import org.archena.polideportivo.api.exceptions.BadRequestException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserServiceImpl {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public UserJwtDto authenticateUser(LoginDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateJwtToken(authentication);
        User user = userRepository.findByUsername(userDetails.getUsername());
        return new UserJwtDto(jwt, "Bearer", user.getId(), user.getUsername(), user.getEmail(),
                user.getRole().toString());

    }

    public void registerUser(SignupDto signupDto) {
        if (this.userRepository.existsByUsername(signupDto.getUsername())) {
            throw new BadRequestException("There is already a user with username: " + signupDto.getUsername());
        }

        if (this.userRepository.existsByEmail(signupDto.getEmail())) {
            throw new BadRequestException("There is already a user with email: " + signupDto.getEmail());
        }

        Role userRol;
        try {
            userRol = Role.valueOf(signupDto.getRol());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Incorrect role");
        }

        User user = new User(signupDto.getUsername(),
                passwordEncoder.encode(signupDto.getPassword()),
                signupDto.getEmail(),
                userRol);

        this.userRepository.save(user);
    }
}

