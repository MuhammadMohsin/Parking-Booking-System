import { Component } from '@angular/core';
import {AngularFire} from 'angularfire2'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'login',
  templateUrl: './book.parking.component.html',
  styleUrls: ['./book.parking.component.css']
})
export class BookParkingComponent {
  userObj = {email: "", password: ""};
  afRef : any;
  userAuth;
  router;
  userService;
  constructor(private af: AngularFire, private _router: Router, private _userService: UserService){
    this.afRef = af;
    this.router = _router;
    this.userService = _userService;
  }
  /*loginUser(){
    console.log(this.userObj);
    if(this.userObj.email.trim() !="" && this.userObj.password.trim() !="")
      this.afRef.auth.login({ email: this.userObj.email, password: this.userObj.password })
        .then(auth => {
          console.log(auth);
          this.afRef.database.object("/users/"+auth.uid)
            .subscribe(data=>{
              this.userService.setUserData(data);
              this.userAuth = data;
              if(data.role =="user"){
                alert("Go to user");
                // this.router.navigate(["/jobs"]);
              }
              else{
                alert("Go to admin");
                // this.router.navigate(["/admin"])
              }
            });

        }, function (err) {
          console.log(err);
          alert(err.message);
        });
  }*/

  logout(){
    this.userService.logoutUser();
  }
}
