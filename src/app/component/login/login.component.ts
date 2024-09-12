import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

constructor(private auth: AuthService, private router:Router){

}

  ngOnInit(): void {

  }

login(){
 if(this.email==''){
  alert('Please Enter your email');
  return;
 }
    
 if(this.password==''){
  alert('Please Enter your password');
  return;
 }

 this.auth.login(this.email,this.password);
 this.email='';
 this.password='';
}
}
