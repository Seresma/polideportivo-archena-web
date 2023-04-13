package org.archena.polideportivo.api.controllers;

import org.archena.polideportivo.api.auth.dto.SignupDto;
import org.archena.polideportivo.api.auth.repositories.UserRepository;
import org.archena.polideportivo.api.auth.services.UserServiceImpl;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    // !!! IMPORTANT -> GlobalConfig.IS_AUTHENTICATION_ENABLE and GlobalConfig.IS_DATA_INITIALIZATION_ENABLE both must be FALSE
    private final String baseUri = "/polideportivo";

    @Autowired
    private MockMvc mockMvcAuthController;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserRepository userRepository;

    @After
    public void tearDown() {
        this.userRepository.deleteAll();
    }

    @Test
    public void whenRegisterUserUserOk_thenOk() throws Exception {
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\"," +
                                "\"password\":\"password\"," +
                                "\"email\":\"user@gmail.com\"," +
                                "\"rol\":\"USER\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("User registered successfully!"));
    }

    @Test
    public void whenRegisterUserAdminOk_thenOk() throws Exception {
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\"," +
                                "\"password\":\"password\"," +
                                "\"email\":\"user@gmail.com\"," +
                                "\"rol\":\"ADMIN\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("User registered successfully!"));
    }

    @Test
    public void whenRegisterUserBlankProperty_thenOk() throws Exception {
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"  \"," +
                                "\"password\":\"password\"," +
                                "\"email\":\"user@gmail.com\"," +
                                "\"rol\":\"USER\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenRegisterUserNullProperty_thenBadRequest() throws Exception {
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"password\":\"password\"," +
                                "\"email\":\"user@gmail.com\"," +
                                "\"rol\":\"USER\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenRegisterUserBadRole_thenBadRequest() throws Exception {
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\"," +
                                "\"password\":\"password\"," +
                                "\"email\":\"user@gmail.com\"," +
                                "\"rol\":\"MODERATOR\"}"))
                .andExpect(status().isBadRequest())
                .andExpect((jsonPath("$.message").value("Incorrect role")));
    }

    @Test
    public void whenRegisterUserBadRole2_thenBadRequest() throws Exception {
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\"," +
                                "\"password\":\"password\"," +
                                "\"email\":\"user@gmail.com\"," +
                                "\"rol\":\"User\"}"))
                .andExpect(status().isBadRequest())
                .andExpect((jsonPath("$.message").value("Incorrect role")));
    }

    @Test
    public void whenRegisterUserBadSizeUser_thenBadRequest() throws Exception {
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"us\"," +
                                "\"password\":\"password\"," +
                                "\"email\":\"user@gmail.com\"," +
                                "\"rol\":\"USER\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenRegisterUserBadSizePassword_thenBadRequest() throws Exception {
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\"," +
                                "\"password\":\"12345\"," +
                                "\"email\":\"user@gmail.com\"," +
                                "\"rol\":\"USER\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenRegisterUserBadEmail_thenBadRequest() throws Exception {
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\"," +
                                "\"password\":\"12345\"," +
                                "\"email\":\"usergmail.com\"," +
                                "\"rol\":\"USER\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void whenRegisterUserUsernameTaken_thenBadRequest() throws Exception {
        this.userService.registerUser(new SignupDto("user", "password", "user@gmail.com", "USER"));
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\"," +
                                "\"password\":\"password\"," +
                                "\"email\":\"user@gmail.com\"," +
                                "\"rol\":\"USER\"}"))
                .andExpect(status().isBadRequest())
                .andExpect((jsonPath("$.message").value("There is already a user with username: user")));
    }

    @Test
    public void whenRegisterUserEmailTaken_thenBadRequest() throws Exception {
        this.userService.registerUser(new SignupDto("user", "password", "user@gmail.com", "USER"));
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user1\"," +
                                "\"password\":\"password\"," +
                                "\"email\":\"user@gmail.com\"," +
                                "\"rol\":\"USER\"}"))
                .andExpect(status().isBadRequest())
                .andExpect((jsonPath("$.message").value("There is already a user with email: user@gmail.com")));
    }

    @Test
    public void whenAuthenticateUserUserOk_thenOk() throws Exception {
        this.userService.registerUser(new SignupDto("user", "password", "user@gmail.com", "USER"));
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\"," +
                                "\"password\":\"password\"}"))
                .andExpect(status().isOk())
                .andExpect((jsonPath("$.username").value("user")))
                .andExpect((jsonPath("$.id").isNotEmpty()))
                .andExpect((jsonPath("$.rol").value("USER")))
                .andExpect((jsonPath("$.type").value("Bearer")))
                .andExpect((jsonPath("$.token").isNotEmpty()));
    }

    @Test
    public void whenAuthenticateUserAdminOk_thenOk() throws Exception {
        this.userService.registerUser(new SignupDto("admin", "password", "admin@gmail.com", "ADMIN"));
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"admin\"," +
                                "\"password\":\"password\"}"))
                .andExpect(status().isOk())
                .andExpect((jsonPath("$.username").value("admin")))
                .andExpect((jsonPath("$.id").isNotEmpty()))
                .andExpect((jsonPath("$.rol").value("ADMIN")))
                .andExpect((jsonPath("$.type").value("Bearer")))
                .andExpect((jsonPath("$.token").isNotEmpty()));
    }

    @Test
    public void whenAuthenticateUserBadCredentials_thenUnauthorized() throws Exception {
        this.userService.registerUser(new SignupDto("admin", "password", "admin@gmail.com", "ADMIN"));
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"admin\"," +
                                "\"password\":\"adsfadsgasgda\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect((jsonPath("$.message").value("Bad credentials")));
    }

    @Test
    public void whenAuthenticateUserNonexistentUser_thenUnauthorized() throws Exception {
        this.mockMvcAuthController.perform(post(this.baseUri + "/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"admin\"," +
                                "\"password\":\"adsfadsgasgda\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect((jsonPath("$.message").value("Bad credentials")));
    }

}
