import { Component } from '@angular/core';
import { AccommodationComponent } from '../accommodation/accommodation';
import { AnnouncementComponent } from '../announcement/announcement';
import { FaqComponent } from '../faq/faq';
import { FooterComponent } from '../footer/footer';
import { GalleryComponent } from '../gallery/gallery';
import { LivebandsComponent } from '../livebands/livebands';
import { OverviewComponent } from '../overview/overview';
import { RegistrationsComponent } from '../registrations/registrations';
import { SaveTheDateComponent } from '../save-the-date/save-the-date';
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
    SaveTheDateComponent,
    FaqComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
