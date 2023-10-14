import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from 'src/environments/environment';
import { routes } from './app.routes';

//Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//NgRx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      StoreModule.forRoot(
        appReducers
      )
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
