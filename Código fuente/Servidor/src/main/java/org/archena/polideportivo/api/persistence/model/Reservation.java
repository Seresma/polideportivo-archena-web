package org.archena.polideportivo.api.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.archena.polideportivo.api.auth.model.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String sport;
    @NotBlank
    private String track;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private LocalDateTime createdDate;

    private Double cost;

    private LocalDate day;

    private StateEnum state;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
