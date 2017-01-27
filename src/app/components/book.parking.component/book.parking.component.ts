import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service'

@Component({
  selector: 'login',
  templateUrl: './book.parking.component.html',
  styleUrls: ['./book.parking.component.css']
})
export class BookParkingComponent {
  userObj = {email: "", password: ""};
  afRef: any;
  userAuth;
  router;
  userService;
  locationsRef;
  AllLocations = [];
  locationList1;
  locationList2;
  locationList3;
  loadMaps = false;
  myReservedParkingList : any;
  authUserKey: String = "";

  parkingObj = {
    parkingDate: new Date(),
    startTime: "",
    parkingHrs: "",
    location: "location1"
  };

  constructor(private af: AngularFire, private _router: Router, private _userService: UserService) {
    this.afRef = af;
    this.router = _router;
    this.userService = _userService;
    this.userAuth = this.userService.getUserData();
    let authUserKey =  this.userAuth.$key
    this.locationsRef = this.afRef.database.list("/locations");
    this.locationsRef.subscribe(locationsList=> {
      this.AllLocations = locationsList;

      this.locationList1 = this.AllLocations[0];
      this.locationList2 = this.AllLocations[1];
      this.locationList3 = this.AllLocations[2];

      this.myReservedParkingList = [];
      this.loadMaps = true;

      console.log(this.AllLocations);

      let myRes = [];
      this.AllLocations.forEach(function(locations){
        locations.slots.forEach(function(slotObj){
          if(slotObj.bookedBy == authUserKey){
            console.log(slotObj.bookedBy);
            myRes.push({slot: slotObj, location: locations.$key})
          }
        })
      });
      this.myReservedParkingList = myRes;
      console.log(this.myReservedParkingList);

    });
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

  parseDate(dateString: string): Date {
    if (dateString) {
      let date = new Date(dateString);
      console.log(date);
      return date;
    } else {
      return null;
    }
  }

  selectedSlot;

  selectSlot(locationNum, slotObj, ind) {

    this.locationList1.slots.forEach(slot=> {
      if (slot.bookedBy == "")
        slot.selectable = "";
    });
    this.locationList2.slots.forEach(slot=> {
      if (slot.bookedBy == "")
        slot.selectable = "";
    });
    this.locationList3.slots.forEach(slot=> {
      if (slot.bookedBy == "")
        slot.selectable = "";
    });
    slotObj.selectable = "true";

    if (slotObj.bookedBy == "") {
      this.selectedSlot = {
        locationNum: locationNum,
        slotInd: ind
      };
      console.log("pressed")
    }
    else {
      this.selectedSlot = {
        locationNum: "",
        slotInd: ""
      };
      console.log("pressed")
    }

  }

  saveReservation() {

    if ((this.selectedSlot.locationNum !="" || this.selectedSlot.locationNum ==0) && this.parkingObj.parkingDate != null &&
      this.parkingObj.startTime.trim() != "" && this.parkingObj.parkingHrs.trim() != "") {

      console.log(this.parkingObj);
      let key = "location"+this.selectedSlot.locationNum+"/slots/"+this.selectedSlot.slotInd;
      this.locationsRef.update(key, {
        bookedBy: this.userAuth.$key,
        parkingData : this.parkingObj.parkingDate,
        parkingHrs: this.parkingObj.parkingHrs,
        startTime: this.parkingObj.startTime
      }).then(data=>{
        console.log(data);
        this.parkingObj = {
          parkingDate: new Date(),
          startTime: "",
          parkingHrs: "",
          location: "location1"
        };
        alert("parking saved successfully")
      }, err=>{
        alert(err.message)
      });

    }
    else {
      alert("Please fill all fields");
    }
  }


  logout() {
    this.userService.logoutUser();
  }
}
