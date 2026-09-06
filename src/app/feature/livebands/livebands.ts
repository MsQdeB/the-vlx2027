import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-livebands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livebands.html',
  styleUrl: './livebands.css',
})
export class LivebandsComponent {
  bands = [
    {
      name: 'HAT JAZZ BAND',
      description:
        '"Our very own local Jazz band whose positivity have made our past events so full of energy! Our local band, the <a href="https://www.facebook.com/hatjazzband" target="_blank" rel="noopener noreferrer">HAT Jazz Band</a>, simply the best Jazz band in Da Nang, Vietnam."',
      image: '/assets/live-bands/Band-HATJAZZBAND.jpg',
    },
    {
      name: 'ASIAN GOLDEN SWING QUARTET',
      description:
        '"Coming all the way from Japan, <a href="https://www.facebook.com/asiangoldenswingquartet" target="_blank" rel="noopener noreferrer">Asian Golden Swing Quartet</a> + <a href="https://www.facebook.com/profile.php?id=100003553186281" target="_blank" rel="noopener noreferrer">Ryohei</a> have played at big Swing Dance events and are loved by many dancers. Join us in welcoming them back to Vietnam!"',
      image: '/assets/live-bands/Band Asian-Golden-Swing-Quartet.jpg',
    },
  ];
}
