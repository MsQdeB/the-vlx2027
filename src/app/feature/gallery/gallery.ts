import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class GalleryComponent implements AfterViewInit {
  @ViewChild('thumbnailContainer') thumbnailContainer!: ElementRef;
  currentIndex = 0;
  private touchStartX = 0;
  private touchEndX = 0;

  images = [
    { url: '/assets/gallery/group-photo-1_1_orig.jpg', alt: 'Group Photo 1' },
    { url: '/assets/gallery/group-photo_1_orig.jpg', alt: 'Group Photo 2' },
    { url: '/assets/gallery/dsc01096_1_orig.jpg', alt: 'Dance Event 1' },
    { url: '/assets/gallery/dsc01104_1_orig.jpg', alt: 'Dance Event 2' },
    { url: '/assets/gallery/dsc01457_1_orig.jpg', alt: 'Dance Event 3' },
    { url: '/assets/gallery/dsc02057_1_orig.jpg', alt: 'Dance Event 4' },
    { url: '/assets/gallery/dsc02315_1_orig.jpg', alt: 'Dance Event 5' },
    { url: '/assets/gallery/dsc02320_1_orig.jpg', alt: 'Dance Event 6' },
    { url: '/assets/gallery/dsc02628_1_orig.jpg', alt: 'Dance Event 7' },
    { url: '/assets/gallery/dsc02911_1_orig.jpg', alt: 'Dance Event 8' },
    { url: '/assets/gallery/dsc02937_1_orig.jpg', alt: 'Dance Event 9' },
    { url: '/assets/gallery/dsc03024_1_orig.jpg', alt: 'Dance Event 10' },
    { url: '/assets/gallery/dsc03040_1_orig.jpg', alt: 'Dance Event 11' },
    { url: '/assets/gallery/dsc03074_1_orig.jpg', alt: 'Dance Event 12' },
    { url: '/assets/gallery/dsc03339_1_orig.jpg', alt: 'Dance Event 13' },
    { url: '/assets/gallery/dsc03376_1_orig.jpg', alt: 'Dance Event 14' },
    { url: '/assets/gallery/dsc03384_1_orig.jpg', alt: 'Dance Event 15' },
    { url: '/assets/gallery/prom-night-4_1_orig.jpg', alt: 'Prom Night 1' },
    { url: '/assets/gallery/prom-night-8_1_orig.jpg', alt: 'Prom Night 2' },
    { url: '/assets/gallery/sat-night-1_1.jpg', alt: 'Saturday Night 1' },
    { url: '/assets/gallery/sat-night-2_1_orig.jpg', alt: 'Saturday Night 2' },
    { url: '/assets/gallery/sat-night-3_1_orig.jpg', alt: 'Saturday Night 3' },
    { url: '/assets/gallery/sat-night-5_1_orig.jpg', alt: 'Saturday Night 5' },
    { url: '/assets/gallery/1002929_1_orig.jpg', alt: 'Event Photo 1' },
    { url: '/assets/gallery/6636380_1_orig.jpg', alt: 'Event Photo 2' },
    { url: '/assets/gallery/6828278_1.jpg', alt: 'Event Photo 3' },
    { url: '/assets/gallery/__1548151_orig.jpg', alt: 'Event Photo 4' },
    { url: '/assets/gallery/__4697668_orig.jpg', alt: 'Event Photo 5' },
    { url: '/assets/gallery/__4738051_orig.jpg', alt: 'Event Photo 6' },
    { url: '/assets/gallery/__517281_orig.jpg', alt: 'Event Photo 7' },
    { url: '/assets/gallery/__6235635_orig.jpg', alt: 'Event Photo 8' },
    { url: '/assets/gallery/__6498303_orig.jpg', alt: 'Event Photo 9' },
    { url: '/assets/gallery/__6648912_orig.jpg', alt: 'Event Photo 10' },
    { url: '/assets/gallery/__7527881_orig.jpg', alt: 'Event Photo 11' },
    { url: '/assets/gallery/__8876263_orig.jpg', alt: 'Event Photo 12' },
  ];

  ngAfterViewInit() {
    // Initial scroll to active thumbnail
    setTimeout(() => this.scrollToActiveThumbnail(), 100);
  }

  get currentImage() {
    return this.images[this.currentIndex];
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.scrollToActiveThumbnail();
  }

  previousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.scrollToActiveThumbnail();
  }

  goToImage(index: number) {
    this.currentIndex = index;
    this.scrollToActiveThumbnail();
  }

  private scrollToActiveThumbnail() {
    if (!this.thumbnailContainer) return;

    const container = this.thumbnailContainer.nativeElement;
    const thumbnails = container.querySelectorAll('.thumbnail');
    const activeThumbnail = thumbnails[this.currentIndex] as HTMLElement;

    if (activeThumbnail) {
      const containerWidth = container.offsetWidth;
      const thumbnailLeft = activeThumbnail.offsetLeft;
      const thumbnailWidth = activeThumbnail.offsetWidth;

      // Calculate the scroll position to center the active thumbnail
      const scrollPosition = thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const swipeThreshold = 50; // Minimum distance to be considered a swipe
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        this.nextImage();
      } else {
        // Swipe right - previous image
        this.previousImage();
      }
    }
  }
}
