import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp({"projectId":"files-vinculacion","appId":"1:57791761874:web:42ef3378cf222b841f8c0b","storageBucket":"files-vinculacion.appspot.com","apiKey":"AIzaSyBjGm7GxPFhJ26pscQS4K8g1c2S1WcuvaM","authDomain":"files-vinculacion.firebaseapp.com","messagingSenderId":"57791761874","measurementId":"G-J4BZ7LB2K6"})),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
