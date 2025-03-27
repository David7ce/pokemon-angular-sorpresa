import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { AppComponent } from './app/app.component';
// import { environment } from './environments/environment.prod';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideFirestore(() => getFirestore())
//   ]
// }).catch(err => console.error(err));