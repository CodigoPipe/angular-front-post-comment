import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalPageComponent } from './components/principal-page/principal-page.component';
import { AppComponent } from './components/app.component';
import { MainComponent } from './components/main/main.component';

const appRoutes:Routes = [

  {path:"", component:PrincipalPageComponent },
  {path:"post", component: MainComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
