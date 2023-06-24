package org.archena.polideportivo.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UpdateUserDto {
    private String username;
    private String password;
    private String email;
    private String rol;
    private String jwt;
}
