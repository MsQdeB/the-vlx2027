import { Component } from '@angular/core';
import { AccommodationComponent } from '../accommodation/accommodation';
import { AnnouncementComponent } from '../announcement/announcement';
import { FooterComponent } from '../footer/footer';
import { GalleryComponent } from '../gallery/gallery';
import { LivebandsComponent } from '../livebands/livebands';
import { OverviewComponent } from '../overview/overview';
import { RegistrationsComponent } from '../registrations/registrations';
import { TransportationComponent } from '../transportation/transportation';
import { YoutubeHighlightsComponent } from '../youtube-highlights/youtube-highlights';

@Component({
  selector: 'app-home',
  imports: [
    OverviewComponent,
    AnnouncementComponent,
    LivebandsComponent,
    AccommodationComponent,
    TransportationComponent,
    RegistrationsComponent,
    GalleryComponent,
    YoutubeHighlightsComponent,
    FooterComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
