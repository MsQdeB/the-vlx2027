import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = {
    facebookPage: 'https://www.facebook.com/vietnamlindyexchange',
    facebookGroup: 'https://www.facebook.com/groups/TheVLX',
    instagram: 'https://www.instagram.com/vietnamlindyexchange',
  };
}
