package org.archena.polideportivo.api.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.archena.polideportivo.api.auth.repositories.UserRepository;
import org.archena.polideportivo.api.dto.CreateReservationDto;
import org.archena.polideportivo.api.persistence.model.Reservation;
import org.archena.polideportivo.api.persistence.model.StateEnum;
import org.archena.polideportivo.api.persistence.repositories.ReservationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
@Slf4j
public class ReservationServiceImpl {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelmapper;


    public Reservation reservar(CreateReservationDto reservationDto) {

        Reservation reservation = modelmapper.map(reservationDto, Reservation.class);

        final String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();

        reservation.setStartDate(reservation.getStartDate().plusHours(2));
        reservation.setEndDate(reservation.getEndDate().plusHours(2));

        reservation.setDay(reservation.getStartDate().toLocalDate());
        reservation.setUser(this.userRepository.findByUsername(currentUserName));
        reservation.setState(StateEnum.PENDIENTE);
        reservation.setCreatedDate(LocalDateTime.now());

        switch (reservation.getSport()) {
            case "Fútbol":
                reservation.setCost(15.00);
                break;
            case "Tenis":
                reservation.setCost(8.00);
                break;
            case "Baloncesto":
                reservation.setCost(10.00);
                break;
            case "Frontón":
                reservation.setCost(5.00);
                break;
            case "Natación":
                reservation.setCost(6.50);
                break;
        }

        return this.reservationRepository.save(reservation);
    }

    public List<Reservation> findReservationsByDayAndTrack(String day, String track) {
        LocalDate dayParsed = LocalDate.parse(day);
        return reservationRepository.findByDayAndTrack(dayParsed, track);
    }
}
