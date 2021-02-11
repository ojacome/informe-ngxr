import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app.routing';

import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { appReducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,  
    AuthModule,    
    AppRoutingModule,    
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
