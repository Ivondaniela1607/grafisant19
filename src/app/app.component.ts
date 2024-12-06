import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';

  loading = signal(true);

  private authService = inject(AuthService);
  ngOnInit() {

    setTimeout(() => {
      this.loading.set(false);
    }, 3000);
  }
}
