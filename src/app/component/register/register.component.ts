import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

email: string = ""
password: string = ""

  constructor(private auth:AuthService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  register(){
    if(this.email==''){
      alert('Please Enter your email');
      return;
     }
        
     if(this.password==''){
      alert('Please Enter your password');
      return;
     }
    
     this.auth.register(this.email,this.password);
     this.email='';
     this.password='';
  }

    

}
