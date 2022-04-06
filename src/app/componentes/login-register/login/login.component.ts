import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
  public loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService) {

  }

  ngOnInit() { }

  onLogin() {
    this.cargando = true;
    this.error = false;
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password).then((user) => {
      if (user) {
        // this.router.navigateByUrl("");
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
    if(this.loginForm.get(field)?.hasError("required")) {
      retorno = "Campo vacío.";
    }
    else if(this.loginForm.get(field)?.hasError("minlength")) {
      retorno = "Mínimo de carácteres 6";
    }
    else if(this.loginForm.get(field)?.hasError("email")){
      retorno = "Not valid email.";
    }
    return retorno;
  }

  isNotValidField(field: string): boolean {
    return (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty == true)
      && !this.loginForm.get(field)?.valid;
  }

  completarLogin() {
    this.loginForm.setValue({ username: "usuario@gmail.com", password: "123456" });
  }

}
