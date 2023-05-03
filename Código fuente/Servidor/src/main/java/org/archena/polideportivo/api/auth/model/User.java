package org.archena.polideportivo.api.auth.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.archena.polideportivo.api.persistence.model.Reservation;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @NotBlank
    @Email
    private String email;
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Reservation> reservations = new ArrayList<>();

    public User(String username, String password, String email, Role rol) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = rol;
    }
}
