import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from '../services/data-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataResponse: any
  firstname: any;
  lastname: any;
  emailAddress: any;
  mobile: any;
  locationType: any;
  locationString: any;
  idForUpdate: any;
  idForDeleteKey: any;
  communicationText: any;
  communicationTextLength: any;

  constructor(private http: HttpClient, private userData: DataServiceService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userData.getData().subscribe(data => {
      console.log("get data", data);
      this.dataResponse = data
    });
  }

  saveLead() {
    let dataInput = {
      "first_name": this.firstname,
      "last_name": this.lastname,
      "mobile": this.mobile,
      "email": this.emailAddress,
      "location_type": this.locationType,
      "location_string": this.locationString
    }

    // let dataInput = {
      // "email": "nagd@gmail.com",
      // "first_name": "Sai",
      // "last_name": "Sasadsa",
      // "mobile": "9871028333",
      // "location_type": "Country",
      // "location_string": "India"
    // }
    console.log(dataInput);
    this.userData.saveData(dataInput).subscribe(data => {
      this.dataResponse.push(data)
      console.log("saved data", data);


    });
  }

  idPass(id) {
    console.log(id);
    this.idForUpdate = id;
  }

  idForDelete(id){
    console.log(id);
    this.idForDeleteKey = id;
  }

  saveUpdate() {
    console.log(this.communicationText);
    let dataInput = {
      "communication": this.communicationText
    }
    console.log(dataInput);
    this.userData.updateData(dataInput,this.idForUpdate).subscribe(data => {
      console.log("Api Message", data);
    });
  }

  deleteLead(){
    console.log("id", this.idForDeleteKey);
    this.userData.deleteLead(this.idForDeleteKey).subscribe(() => {
      this.getData();
      console.log('Delete Successful'),
      (err) => console.log(err)
    });
  }
}
