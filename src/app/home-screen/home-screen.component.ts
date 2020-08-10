import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormControl , FormGroup } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {
  addEmpPopup : boolean = false;
  confirmEmpData : boolean = false;
  sortPopup : boolean = false;
  overlay : boolean = false;
  win = window;
  emp_data = [];
  updateForm : boolean = false;
  empId : any;

  addEmpForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    address: new FormControl(''),
    dob: new FormControl(''),
    mobile: new FormControl(''),
    city: new FormControl('')
  })

  constructor(private _app : AppComponent , private _http : HttpClient , private _router : Router ) { }

  ngOnInit(): void {
    if(Cookie.get('MB_auth') != undefined && Cookie.get('MB_auth') != ''){
      this.getEmployeeData();
    }else{
      this._router.navigateByUrl('login');
    }
  }

  getEmployeeData(){
    this.emp_data = [];
    this._http.get('http://localhost:5000/api/getempdata').subscribe( res => {
      console.log(res);
      this.emp_data = res[0];
    })
  }

  updateEmp(empid){
    this.empId = empid;
    this.updateForm = true;
     this._http.get('http://localhost:5000/api/getempdata?empid='+empid).subscribe( data =>{
       let res = data[0];
       this.addEmpPopup = true;
       this.overlay = true;
       this.addEmpForm.setValue({
        fname : res[0].firstname,
        lname : res[0].lastname,
        address : res[0].address,
        dob : res[0].dob,
        mobile : res[0].mobile,
        city : res[0].city,
       })
      //  this.addEmpForm.controls.fname = res[0].firstname;
      //  this.addEmpForm.controls.lname = res[0].lastname;
      //  this.addEmpForm.controls.address = res[0].address;
      //  this.addEmpForm.controls.dob = res[0].dob;
      //  this.addEmpForm.controls.mobile = res[0].mobile;
      //  this.addEmpForm.controls.city = res[0].city;
     });
  }

  deleteEmp(empid){
    let postdata = "{\"empid\":\"" + empid + "\"}";
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this._http.post('http://localhost:5000/api/delemp', postdata , options).subscribe( res=>{
      if(res === 'success'){
        this.getEmployeeData();
      }
    })
  }

  sortBy(type){
    this.overlay = false;
    this.sortPopup = false;
    let postdata = "{\"sorttype\":\"" + type + "\"}";
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this._http.post('http://localhost:5000/api/sort', postdata , options).subscribe( res=>{
      this.emp_data = [];
      this.emp_data = res[0];
    })
  }

  addEmployee(){
    this.addEmpPopup = false;
    this.confirmEmpData = true;
  }

  overlayClick(){
    this.closeAllPopups();
  }

  closeAllPopups(){
    this.overlay = false;
    this.addEmpPopup = false;
    this.sortPopup = false;
    this.confirmEmpData = false;
  }

  saveEmpData(){
    console.log(this.addEmpForm.value);
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if(!this.updateForm){
      let postdata = this.addEmpForm.value;
      this._http.post('http://localhost:5000/api/addemp', postdata, options).subscribe( res =>{
        if(res === 'success'){
          this.closeAllPopups();
          this.getEmployeeData();
        }else{
          this.confirmEmpData = false;
          this.addEmpPopup = true;
        }
      })
    } else {
      let postdata = [{
        "empid" : this.empId
      },{
        "data" : this.addEmpForm.value
      }]
      this._http.post('http://localhost:5000/api/updateemp' , postdata , options).subscribe( res =>{
        if(res === 'success'){
          this.closeAllPopups();
          this.getEmployeeData();
        }
      })
    }
  }
}
