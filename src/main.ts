import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; // Import this only

bootstrapApplication(AppComponent, appConfig)
  /*providers: [
    provideRouter(routes),
    //provideHttpClient() // Provide HTTP client here
  ],
})*/
  .catch((err) => console.error(err));
