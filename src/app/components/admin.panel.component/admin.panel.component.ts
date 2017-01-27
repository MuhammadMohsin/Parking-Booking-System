import { Component } from '@angular/core';
import {AngularFire} from 'angularfire2'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'login',
  templateUrl: './admin.panel.component.html',
  styleUrls: ['./admin.panel.component.css']
})
export class AdminPanelComponent {

  afRef : any;
  router;
  userService;
  allusersRef;
  companyUsers = [];
  studentUsers = [];

  constructor(private af: AngularFire, private _router: Router, private _userService: UserService){
    this.afRef = af;
    this.router = _router;
    this.userService = _userService;
    this.allusersRef = this.af.database.list("/users");
    this.allusersRef.subscribe(
      users=>{
        this.companyUsers = [];
        this.studentUsers = [];
        users.forEach(userObj=>{
          if(userObj.role=="company")
            this.companyUsers.push(userObj)
          if(userObj.role=="student")
            this.studentUsers.push(userObj)
        })
      }
    )

  }

  removeUser(userObj){
    this.allusersRef.remove(userObj.$key);
  }

  logout(){
    this.userService.logoutUser();
  }
}
