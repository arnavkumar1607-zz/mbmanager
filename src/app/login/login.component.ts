import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders , HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private _app: AppComponent, private _router : Router, private _http : HttpClient) { }

  ngOnInit(): void {
    this._app.screen_title = 'Manager Login';
  }

  Login(){
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
      }
    })
  }
}
