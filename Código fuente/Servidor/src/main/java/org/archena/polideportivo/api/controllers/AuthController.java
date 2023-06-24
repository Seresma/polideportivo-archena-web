package org.archena.polideportivo.api.controllers;

import io.swagger.annotations.*;
import io.swagger.models.Response;
import lombok.AllArgsConstructor;
import org.archena.polideportivo.api.auth.dto.LoginDto;
import org.archena.polideportivo.api.auth.dto.SignupDto;
import org.archena.polideportivo.api.auth.dto.UpdateUserDto;
import org.archena.polideportivo.api.auth.dto.UserJwtDto;
import org.archena.polideportivo.api.auth.model.User;
import org.archena.polideportivo.api.auth.services.UserServiceImpl;
import org.archena.polideportivo.api.persistence.model.Reservation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@Api(description = "Provides endpoints to authenticate users")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/polideportivo/auth")
public class AuthController {

    private final UserServiceImpl userService;

    @ApiOperation(value = "Logs user into the system", response = UserJwtDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 400, message = "Invalid username/password supplied"),
            @ApiResponse(code = 401, message = "Bad credentials"),
            @ApiResponse(code = 404, message = "User not found"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @PostMapping("/login")
    public UserJwtDto authenticateUser(@ApiParam(value = "User credentials", required = true) @Valid @RequestBody LoginDto login) {
        return this.userService.authenticateUser(login);
    }

    @ApiOperation(value = "Registers a new user into the system")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 400, message = "Invalid data supplied"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @PostMapping("/signup")
    public UserJwtDto registerUser(@ApiParam(value = "User registration data", required = true) @Valid @RequestBody SignupDto signup) {
        return this.userService.registerUser(signup);
    }

    @ApiOperation(value = "Renews user jwt token", response = UserJwtDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 400, message = "Invalid username/password supplied"),
            @ApiResponse(code = 401, message = "Bad credentials"),
            @ApiResponse(code = 404, message = "User not found"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/renew")
    public UserJwtDto renewToken(@ApiParam(value = "Jwt token", required = true) @Valid @RequestHeader("x-token") String token) {
        return this.userService.renewJwtToken(token);
    }

    @ApiOperation(value = "Updates user", response = UserJwtDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 400, message = "Invalid email/password supplied"),
            @ApiResponse(code = 401, message = "Bad credentials"),
            @ApiResponse(code = 404, message = "User not found"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @PutMapping("/update")
    public UserJwtDto updateUser(@RequestBody UpdateUserDto updateUserDto) {
        return this.userService.updateUser(updateUserDto);
    }

    @ApiOperation(value = "Finds all users", response = User[].class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 401, message = "You must register to do this operation"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/users")
    public List<User> findAllUsers() {
        return this.userService.findAll();
    }

    @ApiOperation(value = "Delete user by id", response = ResponseEntity.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 401, message = "You must register to do this operation"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @DeleteMapping ("/user")
    public ResponseEntity<?> deleteUser(@RequestParam Long id) {
        this.userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }


    @ApiOperation(value = "Updates user", response = UserJwtDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 400, message = "Invalid email/password supplied"),
            @ApiResponse(code = 401, message = "Bad credentials"),
            @ApiResponse(code = 404, message = "User not found"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @PutMapping("/updateUser")
    public UserJwtDto updateUserById(@RequestBody UpdateUserDto updateUserDto, @RequestParam Long id) {
        return this.userService.updateUserById(updateUserDto, id);
    }
}
