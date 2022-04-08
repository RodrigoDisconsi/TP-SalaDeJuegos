import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login-register.component.scss']
})
export class RegisterComponent implements OnInit {

  public cargando:boolean = false;
  public hide:boolean = true;
  public mensaje:string = "";
  public error: boolean = false;
  public errorMsj:string = "";

  public regisForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService) {  }

  ngOnInit() {}

  get f(): { [key: string]: AbstractControl } {
    return this.regisForm.controls;
  }

  onRegistrar(){
    this.error = false;
    this.cargando = true;
    this.auth.register(this.regisForm.value.email, this.regisForm.value.password).then((user)=>{
      if(user){
        user.user.updateProfile({displayName: this.regisForm.value.username}).then(() => {
          this.auth.user = user.user;
          this.auth.loggedIn.next(true);
          localStorage.setItem('nickname', this.auth.user.displayName);
          this.router.navigate(['']);
          this.cargando = false;
        });
      }
    })
    .catch(e => {
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
    return (this.f[field].touched || this.f[field].dirty == true)
      && !this.f[field].valid;
  }

}
