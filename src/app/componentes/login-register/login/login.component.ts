import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login-register.component.scss']
})
export class LoginComponent implements OnInit {

  public cargando: boolean = false;
  public hide: boolean = false;
  public usuario: string = "";
  public error: boolean = false;
  public errorMsj:string = "";
  public loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,  Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService) {

  }

  ngOnInit() { }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onLogin() {
    this.cargando = true;
    this.error = false;
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password).then((user) => {
      if (user) {
        this.auth.user = user.user;
        this.auth.loggedIn.next(true);
        localStorage.setItem('nickname', this.auth.user.displayName);
        this.router.navigate(['']);
        this.cargando = false;
      }
    }).catch(e => {
      this.errorMsj = e.message;
      this.error = true;
      this.cargando = false;
      console.info("ERROR ->", e);
    });
  }

  getErrorMessage(field: string): string {
    let retorno = "";
    if(this.f[field].hasError("required")) {
      retorno = "Empty.";
    }
    else if(this.f[field].hasError("minlength")) {
      retorno = "Mínimo de carácteres 6";
    }
    else if(this.f[field].hasError("email")){
      retorno = "Not valid email.";
    }
    return retorno;
  }

  isNotValidField(field: string): boolean {
    return (this.f[field].touched || this.f[field].dirty)
      && !this.f[field].valid;
  }

  completarLogin() {
    this.loginForm.setValue({ username: "usuario@gmail.com", password: "123456" });
  }


  
}
