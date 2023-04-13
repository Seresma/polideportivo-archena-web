package org.archena.polideportivo.api.services;

import org.archena.polideportivo.api.auth.dto.LoginDto;
import org.archena.polideportivo.api.auth.dto.SignupDto;
import org.archena.polideportivo.api.auth.dto.UserJwtDto;
import org.archena.polideportivo.api.auth.model.Role;
import org.archena.polideportivo.api.auth.model.User;
import org.archena.polideportivo.api.auth.repositories.UserRepository;
import org.archena.polideportivo.api.auth.services.UserServiceImpl;
import org.archena.polideportivo.api.exceptions.BadRequestException;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceImplTest {

    // !!! IMPORTANT -> GlobalConfig.IS_DATA_INITIALIZATION_ENABLE must be FALSE
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceImpl userService;

    @After
    public void tearDown() {
        this.userRepository.deleteAll();
    }

    @Test
    public void whenRegisterUserUser_thenReturnCreated() {
        this.userService.registerUser(new SignupDto("user", "password", "user@gmail.com", "USER"));
        User user = this.userRepository.findByUsername("user");

        assertNotNull(user.getId());
        assertEquals("user", user.getUsername());
        // Encoded password
        assertNotNull(user.getPassword());
        assertEquals("user@gmail.com", user.getEmail());
        assertEquals(Role.USER, user.getRole());
    }

    @Test
    public void whenRegisterUserAdmin_thenReturnCreated() {
        this.userService.registerUser(new SignupDto("admin", "password", "admin@gmail.com", "ADMIN"));
        User user = this.userRepository.findByUsername("admin");

        assertNotNull(user.getId());
        assertEquals("admin", user.getUsername());
        // Encoded password
        assertNotNull(user.getPassword());
        assertEquals("admin@gmail.com", user.getEmail());
        assertEquals(Role.ADMIN, user.getRole());
    }

    @Test
    public void whenRegisterUserUsernameAlreadyExists_thenBadRequestException() throws BadRequestException {
        this.userService.registerUser(new SignupDto("user", "password", "user@gmail.com", "USER"));
        Throwable exception = assertThrows(BadRequestException.class, () -> this.userService.registerUser(new SignupDto("user", "password", "user@gmail.com", "USER")));
        assertEquals("There is already a user with username: user", exception.getMessage());
    }

    @Test
    public void whenRegisterUserEmailAlreadyExists_thenBadRequestException() throws BadRequestException {
        this.userService.registerUser(new SignupDto("user", "password", "user@gmail.com", "USER"));
        Throwable exception = assertThrows(BadRequestException.class, () -> this.userService.registerUser(new SignupDto("user1", "password", "user@gmail.com", "USER")));
        assertEquals("There is already a user with email: user@gmail.com", exception.getMessage());
    }

    @Test
    public void whenRegisterUserIncorrectRole_thenBadRequestException() throws BadRequestException {
        Throwable exception = assertThrows(BadRequestException.class, () -> this.userService.registerUser(new SignupDto("user", "password", "user@gmail.com", "MODERATOR")));
        assertEquals("Incorrect role", exception.getMessage());
    }

    @Test
    public void whenAuthenticateUserNonexistentUser_thenBadCredentialsException() throws BadCredentialsException {
        Throwable exception = assertThrows(BadCredentialsException.class, () -> this.userService.authenticateUser(new LoginDto("user", "password")));
        assertEquals("Bad credentials", exception.getMessage());
    }

    @Test
    public void whenAuthenticateUserBadCredentials_thenBadCredentialsException() throws BadCredentialsException {
        this.userService.registerUser(new SignupDto("user", "password", "user@gmail.com", "USER"));
        Throwable exception = assertThrows(BadCredentialsException.class, () -> this.userService.authenticateUser(new LoginDto("user", "afsadfasdf")));
        assertEquals("Bad credentials", exception.getMessage());
    }

    @Test
    public void whenAuthenticateUserOk_thenReturnToken() {
        this.userService.registerUser(new SignupDto("user", "password", "user@gmail.com", "USER"));
        UserJwtDto userJwtDto = this.userService.authenticateUser(new LoginDto("user", "password"));
        assertNotNull(userJwtDto.getToken());
        assertNotNull(userJwtDto.getId());
        assertEquals("Bearer", userJwtDto.getType());
        assertEquals("user", userJwtDto.getUsername());
        assertEquals("USER", userJwtDto.getRol());
    }

}
