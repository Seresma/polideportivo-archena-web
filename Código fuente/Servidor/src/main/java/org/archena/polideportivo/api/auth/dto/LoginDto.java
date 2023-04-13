package org.archena.polideportivo.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Data
public class LoginDto {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
