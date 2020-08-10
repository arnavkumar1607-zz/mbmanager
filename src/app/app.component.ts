import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public screen_title : string = 'Manager Dashboard';
  public manager_email : string = '';

  constructor(private _router : Router){}

  ngOnInit(){
    if(Cookie.get('MB_auth') != '' && Cookie.get('MB_auth') != undefined){
      this.manager_email = Cookie.get('MB_auth');
    }
  }

  signout(){
    this.manager_email = '';
    Cookie.delete('MB_auth');
    this._router.navigateByUrl('login');
  }
}
