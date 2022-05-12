import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  private readonly URLPreguntas = "https://opentdb.com/api.php?amount=1&difficulty=medium&type=boolean&category=";

  constructor(private http: HttpClient) { }

  GetPreguntas(categoria: string): Observable<any> {
    let url = this.URLPreguntas;
    if(categoria == "0"){
      url = url.replace("&category=", "");
    }
    else{
      url = url + categoria;
    }
    console.log(url);
    return this.http.get(url);
  }
}
