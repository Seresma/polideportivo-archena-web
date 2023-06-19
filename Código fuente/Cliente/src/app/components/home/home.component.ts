import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sports = [
    {
      name: 'Fútbol',
      icon: 'sports_soccer',
      description: 'Experimenta el fútbol en nuestra pistas: calidad, comodidad y pasión en un solo lugar.',
      image: 'assets/futbol.jpg'
    },
    {
      name: 'Tenis',
      icon: 'sports_tennis',
      description: 'Disfruta del tenis en nuestra pistas: calidad y diversión en un entorno excepcional.',
      image: 'assets/tenis.jpg'
    },
    {
      name: 'Baloncesto',
      icon: 'sports_basketball',
      description: 'Juega al baloncesto en nuestra canchas: emoción y competencia en un escenario inigualable.',
      image: 'assets/baloncesto.jpg'
    },
    {
      name: 'Frontón',
      icon: 'radio_button_unchecked',
      description: 'Descubre la pista frontón perfecta: un espacio dedicado a la pasión y el desafío del juego.',
      image: 'assets/fronton_deporte.jpg'
    },
    {
      name: 'Natación',
      icon: 'pool',
      description: 'Sumérgete en diversión y relajación en nuestras refrescantes piscinas: el lugar ideal para disfrutar del agua.',
      image: 'assets/natacion.jpg'
    },
  ];
}
