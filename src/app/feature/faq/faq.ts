import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class FaqComponent {
  faqs = [
    {
      q: 'When and where is VLX 2027?',
      a: 'Friday 19 – Sunday 21 March 2027, in Hội An, Vietnam. The main evening dances will be held at Palm Garden Beach Resort & Spa, with daytime events in town and by the beach.',
    },
    {
      q: 'When does registration open, and how much is a pass?',
      a: 'Registration opens on October 10, 2026, right here on this website and via our social media. Pricing will be announced at the same time. When registration opens, you fill in a form, wait for a confirmation email, and only then follow the payment instructions.',
    },
    {
      q: 'Will there be day passes?',
      a: 'Yes — a limited number of day passes for individual nights will be available once registration opens. Full weekend passes are prioritised.',
    },
    {
      q: 'What dance levels is VLX for?',
      a: 'VLX is a social event for intermediate and above social dancers — there are no classes or taster sessions, so you should feel comfortable dancing socially. If you are unsure, email us and we will help you decide.',
    },
    {
      q: 'Which dance styles can I expect?',
      a: 'Mainly Lindy Hop, with dedicated late-night sessions loved by Balboa and Blues dancers. DJs and live bands play across all three nights.',
    },
    {
      q: 'How do I get there?',
      a: 'Fly into Da Nang International Airport (DAD), then take a 40-minute car ride to Hội An. We will share ride-coordination tips and private-car options closer to the event — see the Transportation section on this page.',
    },
    {
      q: 'Where should I stay?',
      a: 'Palm Garden Beach Resort hosts all main evening dances and offers special rates for VLXers. Alternative accommodation near the venue is listed in the Accommodation section once details are confirmed.',
    },
    {
      q: 'What is the cancellation policy?',
      a: 'VLX does not offer refunds, but passes can be transferred to another dancer — see the Terms page for the full policy and deadlines.',
    },
    {
      q: 'Can I volunteer?',
      a: 'We will open applications for a small core volunteer team closer to the event. Watch our social media or email info.thevlx@gmail.com to be notified.',
    },
    {
      q: 'My question is not answered here.',
      a: 'Write to us at info.thevlx@gmail.com — or send a message on the VLX Facebook page or Instagram. We love hearing from you.',
    },
  ];
}
