import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService) {
      // this.auth.user.subscribe(user =>{
      //   this.user = user;
      // });
  }

  public setResult(result:any){
    return this.afs.collection('resultados').add({
      usuario: this.auth.user,
      juego: result.juego,
      puntaje: result.puntaje,
      fecha: Date.now()
    });
  }

  public get(entidad:string) {
    return this.afs.collection(entidad).valueChanges();
  }
}
