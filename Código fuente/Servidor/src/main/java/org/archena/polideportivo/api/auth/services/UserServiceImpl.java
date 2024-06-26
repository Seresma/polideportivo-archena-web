package org.archena.polideportivo.api.auth.services;

import lombok.extern.slf4j.Slf4j;
import org.archena.polideportivo.api.auth.dto.LoginDto;
import org.archena.polideportivo.api.auth.dto.SignupDto;
import org.archena.polideportivo.api.auth.dto.UpdateUserDto;
import org.archena.polideportivo.api.auth.dto.UserJwtDto;
import org.archena.polideportivo.api.auth.model.Role;
import org.archena.polideportivo.api.auth.model.User;
import org.archena.polideportivo.api.auth.repositories.UserRepository;
import org.archena.polideportivo.api.auth.security.JwtUtils;
import org.archena.polideportivo.api.exceptions.BadRequestException;
import lombok.AllArgsConstructor;
import org.archena.polideportivo.api.persistence.model.Reservation;
import org.archena.polideportivo.api.persistence.repositories.ReservationRepository;
import org.archena.polideportivo.api.services.ReservationServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Slf4j
@Service
public class UserServiceImpl {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final ReservationRepository reservationRepository;
    private final ReservationServiceImpl reservationService;

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

    public UserJwtDto registerUser(SignupDto signupDto) {
        if (this.userRepository.existsByUsername(signupDto.getUsername())) {
            throw new BadRequestException("Este nombre ya está registrado, por favor elige otro.");
        }

        if (this.userRepository.existsByEmail(signupDto.getEmail())) {
            throw new BadRequestException("Este email ya está registrado, por favor elige otro.");
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

        return this.authenticateUser(new LoginDto(signupDto.getUsername(), signupDto.getPassword()));
    }

    public UserJwtDto renewJwtToken(String token) {
        if (!jwtUtils.validateJwtToken(token))
            throw new BadCredentialsException("Invalid token");

        User user = userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(token));
        return new UserJwtDto(token, "Bearer", user.getId(), user.getUsername(), user.getEmail(),
                user.getRole().toString());
    }

    public UserJwtDto updateUser(UpdateUserDto updateUserDto) {
        User user = userRepository.findByUsername(updateUserDto.getUsername());

        if (updateUserDto.getEmail() != null && !updateUserDto.getEmail().isBlank())
            user.setEmail(updateUserDto.getEmail());

        if (updateUserDto.getPassword() != null && !updateUserDto.getPassword().isBlank())
            user.setPassword(passwordEncoder.encode(updateUserDto.getPassword()));

        this.userRepository.save(user);

        return new UserJwtDto(updateUserDto.getJwt(), "Bearer", user.getId(), user.getUsername(), user.getEmail(),
                user.getRole().toString());
    }

    public UserJwtDto updateUserById(UpdateUserDto updateUserDto, Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        User user = userOpt.get();

        if (updateUserDto.getEmail() != null && !updateUserDto.getEmail().isBlank())
            user.setEmail(updateUserDto.getEmail());

        if (updateUserDto.getPassword() != null && !updateUserDto.getPassword().isBlank())
            user.setPassword(passwordEncoder.encode(updateUserDto.getPassword()));

        if (updateUserDto.getRol() != null && !updateUserDto.getRol().isBlank())
            user.setRole(Role.valueOf(updateUserDto.getRol()));

        this.userRepository.save(user);

        return new UserJwtDto(updateUserDto.getJwt(), "Bearer", user.getId(), user.getUsername(), user.getEmail(),
                user.getRole().toString());
    }

    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    public void deleteUser(Long id) {
        for(Reservation reservation: this.reservationService.findReservationsByUserId(id)) {
            this.reservationRepository.delete(reservation);
        }
        this.userRepository.deleteById(id);
    }
}

