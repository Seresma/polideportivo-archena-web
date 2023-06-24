package org.archena.polideportivo.api.persistence.repositories;

import org.archena.polideportivo.api.persistence.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByDayAndTrack(LocalDate day, String track);

    List<Reservation> findByUserId(Long id);

    List<Reservation> findByDayOrderByStartDate(LocalDate dayParsed);
}
