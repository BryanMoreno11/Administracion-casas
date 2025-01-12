import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment.development';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, 
  {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Inicializar Firebase
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()), provideAnimationsAsync(),
  ]
   }
  ).catch((err) => console.error(err));
