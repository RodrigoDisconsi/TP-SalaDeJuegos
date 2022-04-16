import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFirestore} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:any;
  public loggedIn = new BehaviorSubject<boolean>(false); 

  
  constructor(private fauth:AngularFireAuth) { 
    
  }
  
  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  logout(): Promise<void>{
    return this.fauth.signOut();
  }

  register(email:string, password:string): Promise<any>{
    return this.fauth.createUserWithEmailAndPassword(email,password);
  }

  login(email:string, password:string): Promise<any>{
    return this.fauth.signInWithEmailAndPassword(email,password);
  }

  async loginGoogle(): Promise<any>{
    return this.fauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
