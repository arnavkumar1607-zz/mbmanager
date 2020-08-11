import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  submitted = false;
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    address: new FormControl(''),
    dob: new FormControl(''),
    company: new FormControl('', Validators.required)
  })

  constructor(private _router : Router, private _http : HttpClient) { }

  ngOnInit(): void {
  }
  get f() { return this.signupForm.controls; }
  signUp() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      alert("Please fill required field");
      return;
    } else {
      let postdata = this.signupForm.value;
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this._http.post('http://localhost:5000/api/signup', postdata , options).subscribe( res=>{
      if(res === 'success'){
        this._router.navigateByUrl('login');
      } else {
        alert(res);
      }
    })
    }
  }

}
