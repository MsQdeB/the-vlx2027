import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrations',
  standalone: true,
  templateUrl: './registrations.html',
  styleUrls: ['./registrations.css'],
})
export class RegistrationsComponent implements OnInit, OnDestroy {
  countdown = {
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  showCountdown = true;

  private intervalId: any;
  // Countdown target — registration opens October 10, 2026 (midnight, Vietnam time).
  private targetDate = new Date('2026-10-10T00:00:00+07:00');

  constructor() {}

  ngOnInit() {
    this.updateCountdown();
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCountdown() {
    const now = new Date();
    const difference = this.targetDate.getTime() - now.getTime();

    if (difference > 0) {
      // Calendar-accurate months & days (not a fixed 30-day month)
      const target = this.targetDate;
      const nowDate = new Date(now);
      let months =
        (target.getFullYear() - nowDate.getFullYear()) * 12 +
        (target.getMonth() - nowDate.getMonth());
      // Step forward `months` months from now; if it overshoots the target, back off one month
      const anchor = new Date(target.getFullYear(), target.getMonth(), nowDate.getDate());
      if (anchor > target) {
        months--;
      }
      const afterMonths = new Date(nowDate);
      afterMonths.setMonth(afterMonths.getMonth() + months);
      const days = Math.floor((target.getTime() - afterMonths.getTime()) / (1000 * 60 * 60 * 24));

      this.countdown.months = Math.max(months, 0);
      this.countdown.days = Math.max(days, 0);
      this.countdown.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.countdown.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.countdown.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    } else {
      // Event has started or passed
      this.countdown = { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
      this.showCountdown = false;
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  }

  onRegisterClick() {
    // Open registration link — TODO: replace with the 2027 Google Form link when it opens
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSegnsMdwTXmkvnNPksnrTlwK6dWzqmEo3yXc8czvQHiNgsCWg/closedform',
      '_blank',
    );
  }

  onTshirtPreorderClick() {
    // Open t-shirt pre-order link (update with actual link when available)
    // window.open(
    //   'https://docs.google.com/forms/d/e/1FAIpQLSemLT--n_0Qu-dTp9ffHaeSHsFXrNXP7pcUTjyLUYkTq7cIWw/viewform',
    //   '_blank',
    // );
  }
}
