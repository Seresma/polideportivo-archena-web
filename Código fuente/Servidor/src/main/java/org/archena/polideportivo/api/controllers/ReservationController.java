package org.archena.polideportivo.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/polideportivo")
@RestController
public class ReservationController {

    @GetMapping("/info")
    public String getAirlineInfo() {
        return "info";
    }

}
