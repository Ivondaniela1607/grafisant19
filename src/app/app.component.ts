import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';

  loading = signal(true);
  ngOnInit() {
    setTimeout(() => {
      this.loading.set(false);
    }, 3000);
  }
}
