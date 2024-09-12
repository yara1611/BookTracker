import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router : Router) { 
    
  }

  user:string='';
  
  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email,password)
    .then(()=>{
      this.getUser().then((e)=>{
        localStorage.setItem("token",'true');
        localStorage.setItem("userID",e?.uid||'');
        localStorage.setItem("username",e?.displayName||'');
        console.log("auth:"+localStorage.getItem("userID"))
        this.router.navigate(['dashboard'])
      })
        
    },err=>{
        alert(err.messsage)
        this.router.navigate(['/login'])
    })
  }

  register(email : string, password:string,name:string){
    this.fireauth.createUserWithEmailAndPassword(email,password)
    .then( (result)=>{
      alert('Registeration Successful');
        result.user?.updateProfile({
          displayName:name
        })
        this.router.navigate(['/login']);
      }, err =>{
        alert(err.messsage)
        this.router.navigate(['/register'])
      }
    )
  }

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('userID')
      localStorage.removeItem('username')
      this.router.navigate(['/login'])
    },err=>{
      alert(err.messsage);
      
    })
  }

getUser(){
 
   return this.fireauth.currentUser

}
}