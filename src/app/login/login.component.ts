import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { HttpHeaders , HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private _app: AppComponent, private _router : Router, private _http : HttpClient) { }

  ngOnInit(): void {
    this._app.screen_title = 'Manager Login';
  }

  get f() { return this.loginForm.controls; }

  Login(){
    console.log('login')
    this.submitted = true;
    if (this.loginForm.invalid) {
      alert("Please fill required field"); 
      return;
  } else {
    let email = this.loginForm.value.username;
    let postdata = this.loginForm.value;
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this._http.post('http://localhost:5000/api/login', postdata , options).subscribe( res=>{
      if(res === 'success'){
         Cookie.set('MB_auth' , email);
         this._app.manager_email = email;
         this._router.navigateByUrl('');
      } else {
        alert(res);
      }
    })
  }
  }
}
