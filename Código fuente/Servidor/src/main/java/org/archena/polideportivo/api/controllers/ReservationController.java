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
import java.util.Optional;

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

    @ApiOperation(value = "Finds all reservations by user id", response = Reservation[].class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 401, message = "You must register to do this operation"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/reservasUsuario")
    public List<Reservation> findReservationsByUserId(@RequestParam Long id) {
        return this.reservationService.findReservationsByUserId(id);
    }

    @ApiOperation(value = "Pays a reservation by id", response = Reservation[].class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 401, message = "You must register to do this operation"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @PutMapping("/pagarReserva")
    public ResponseEntity<Reservation> payReservation(@RequestParam Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.reservationService.payReservation(id));
    }

    @ApiOperation(value = "Cancels a reservation by id", response = Reservation[].class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 401, message = "You must register to do this operation"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @PutMapping("/cancelarReserva")
    public ResponseEntity<Reservation> cancelReservation(@RequestParam Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.reservationService.cancelReservation(id));
    }

    @ApiOperation(value = "Finds all reservations by day", response = Reservation[].class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 401, message = "You must register to do this operation"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/reservasAll")
    public List<Reservation> findReservationsByDay(@RequestParam String day) {
        return this.reservationService.findReservationsByDay(day);
    }

    @ApiOperation(value = "Finds all reservations", response = Reservation[].class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful operation"),
            @ApiResponse(code = 401, message = "You must register to do this operation"),
            @ApiResponse(code = 500, message = "Internal Server Error")
    })
    @GetMapping("/reservasTodas")
    public List<Reservation> findReservationsByDay() {
        return this.reservationService.findAll();
    }

}
