import { Component } from '@angular/core';

@Component({
  selector: 'app-volunteers',
  standalone: true,
  templateUrl: './volunteers.html',
  styleUrls: ['./volunteers.css'],
})
export class VolunteersComponent {
  constructor() {}

  applyFormUrl = 'https://forms.gle/QuGApjnaiuUHD7Fr7';
}
