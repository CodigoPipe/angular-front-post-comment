import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StateService } from 'src/app/services/state.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.css']
})
export class PrincipalPageComponent implements OnInit {

  constructor(private authService:AuthService,
    private router:Router,
    private state:StateService,
    private request:RequestsService) { }

  ngOnInit(): void {
  }

  async loginWithGoogle(){

    const response = await this.authService.logInWithGoogle()
    if(response){

      
      this.state.state.next({
        logedIn: true,
        authenticatedPerson: response,
        token: ''
      })

      this.request.loginAction({
        username: response.user.email,
        password: response.user.email
      }).subscribe(
        {next: token => {
          if(token){
            this.state.state.next({
              logedIn: true,
              authenticatedPerson: response,
              token: token.access_token
            })
          }
      }

      })
      this.router.navigateByUrl('/post')

    }
  }

  }
