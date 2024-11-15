// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appConfig } from './app.config'; // Import the routes configuration

@NgModule({
  imports: [RouterModule.forRoot(appConfig)], // Configure routing
  exports: [RouterModule]
})
export class AppRoutingModule { }
