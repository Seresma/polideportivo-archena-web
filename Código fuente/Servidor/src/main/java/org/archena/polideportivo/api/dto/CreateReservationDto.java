package org.archena.polideportivo.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class CreateReservationDto {

    @NotBlank
    private String name;
    @NotBlank
    private String sport;
    @NotBlank
    private String track;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
