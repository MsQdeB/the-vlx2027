import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './feature/header/header';
import { ScrollToTopComponent } from './feature/scroll-to-top/scroll-to-top';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, HeaderComponent, ScrollToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('the-vlx');
}
