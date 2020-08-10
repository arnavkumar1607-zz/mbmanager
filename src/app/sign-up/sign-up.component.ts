import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl(''),
    fname: new FormControl(''),
    lname: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    dob: new FormControl(''),
    company: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  signUp(){
    console.log(this.signupForm);
  }

}
