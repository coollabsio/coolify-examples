import { Component, signal, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('static');
  // Build-time public var (baked into bundle)
  protected readonly buildPublicVar = signal((typeof process !== 'undefined' && process.env?.['NG_APP_BUILD_PUBLIC_VAR']) || 'default-value');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('=== Build-time Variables ===');
      console.log('NG_APP_BUILD_PUBLIC_VAR:', this.buildPublicVar());
    }
  }
}
