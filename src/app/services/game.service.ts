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

  getAll(entidad:string){
    return this.afs.collection(entidad).valueChanges();
  }

  getGameResult(game:string){
    return this.afs.collection('results', ref => ref.where('game', '==', game)).valueChanges();
  }

  // getOneActor(idActor:string){
  //   return 
  // }


  setObj(entidad:string, obj:any){
    return this.afs.collection(entidad).doc(obj.id).set(obj, {merge: true});
  }

  removeObj(entidad:string, obj:any){
    return this.afs.collection(entidad).doc(obj.id).delete();
  }

}
