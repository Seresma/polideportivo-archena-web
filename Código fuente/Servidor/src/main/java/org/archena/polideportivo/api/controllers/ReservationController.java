package org.archena.polideportivo.api.controllers;

import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import org.archena.polideportivo.api.dto.CreateReservationDto;
import org.archena.polideportivo.api.persistence.model.Reservation;
import org.archena.polideportivo.api.services.ReservationServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RequestMapping("/polideportivo")
@AllArgsConstructor
@Api(description = "Provides endpoints to make reservations")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
@RestController
public class ReservationController {

    private final ReservationServiceImpl reservationService;

    @ApiOperation(value = "Makes a new reservation", response = Reservation.class)
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Reservation successfully created"),
            @ApiResponse(code = 400, message = "Invalid data supplied"),
            @ApiResponse(code = 401, message = "You must register to do this operation"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @PostMapping("/reservar")
    public ResponseEntity<Reservation> reservar(@ApiParam(value = "Created reservation object", required = true) @Valid @RequestBody CreateReservationDto reservation) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.reservationService.reservar(reservation));
    }

    @ApiOperation(value = "Finds all reservations by day and track", response = Reservation[].class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 401, message = "You must register to do this operation"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/reservas")
    public List<Reservation> findReservationsByDayAndTrack(@RequestParam String day, @RequestParam String track) {
        return this.reservationService.findReservationsByDayAndTrack(day, track);
    }

}
