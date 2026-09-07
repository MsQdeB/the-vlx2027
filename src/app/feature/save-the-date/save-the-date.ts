import { Component } from '@angular/core';

@Component({
  selector: 'app-save-the-date',
  standalone: true,
  imports: [],
  templateUrl: './save-the-date.html',
  styleUrl: './save-the-date.css',
})
export class SaveTheDateComponent {
  // VLX 2027: Friday 19:00 ICT (UTC+7) → Sunday 03:00 ICT
  private readonly startUtc = '20270319T120000Z';
  private readonly endUtc = '20270321T200000Z';
  private readonly title = 'Vietnam Lindy Exchange 2027 (VLX)';
  private readonly details =
    '17th edition of the Vietnam Lindy Exchange. ' +
    'Three days and three nights of swing dancing in the UNESCO World Heritage town of Hội An. ' +
    'Live bands, international DJs, gala dinner, beach dancing & late nights. ' +
    'Details: https://vlx-2027.web.app';
  private readonly location = 'Hội An, Vietnam';

  get googleUrl(): string {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: this.title,
      dates: `${this.startUtc}/${this.endUtc}`,
      details: this.details,
      location: this.location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  get outlookUrl(): string {
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: this.title,
      startdt: '2027-03-19T19:00:00',
      enddt: '2027-03-22T03:00:00',
      body: this.details,
      location: this.location,
    });
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  }

  get yahooUrl(): string {
    const params = new URLSearchParams({
      v: '60',
      title: this.title,
      st: this.startUtc,
      et: this.endUtc,
      desc: this.details,
      in_loc: this.location,
    });
    return `https://calendar.yahoo.com/?${params.toString()}`;
  }

  get icsUrl(): string {
    // Apple Calendar & any other app — served from /vlx-2027.ics
    return '/vlx-2027.ics';
  }
}
