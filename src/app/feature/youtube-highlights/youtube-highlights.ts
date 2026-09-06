import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-highlights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './youtube-highlights.html',
  styleUrl: './youtube-highlights.css',
})
export class YoutubeHighlightsComponent {
  videos: { title: string; embedUrl: SafeResourceUrl }[] = [];

  constructor(private sanitizer: DomSanitizer) {
    // Replace these YouTube video IDs with your actual video IDs
    const videoData = [{ id: 'FNKgiRwGkEs', title: 'VLX 2024 Highlights' }];

    this.videos = videoData.map((video) => ({
      title: video.title,
      embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${video.id}`,
      ),
    }));
  }
}
