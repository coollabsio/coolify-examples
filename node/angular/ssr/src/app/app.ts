import { Component, signal, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ssr');
  // Build-time public var (baked into bundle)
  protected readonly buildPublicVar = signal((typeof process !== 'undefined' && process.env?.['NG_APP_BUILD_PUBLIC_VAR']) || 'default-value');
  // Runtime vars (fetched from server API)
  protected readonly runtimePrivateVar = signal('loading...');
  protected readonly runtimePublicVar = signal('loading...');

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('=== Build-time Variables ===');
      console.log('NG_APP_BUILD_PUBLIC_VAR:', this.buildPublicVar());

      // Fetch runtime vars from server API
      this.http.get<{ runtimePrivateVar: string; runtimePublicVar: string }>('/api/env')
        .subscribe({
          next: (data) => {
            this.runtimePrivateVar.set(data.runtimePrivateVar);
            this.runtimePublicVar.set(data.runtimePublicVar);
            console.log('=== Runtime Variables ===');
            console.log('RUNTIME_PRIVATE_VAR:', data.runtimePrivateVar);
            console.log('RUNTIME_PUBLIC_VAR:', data.runtimePublicVar);
          },
          error: () => {
            this.runtimePrivateVar.set('error');
            this.runtimePublicVar.set('error');
          }
        });
    }
  }
}
