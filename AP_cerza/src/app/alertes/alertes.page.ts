import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-alertes',
  templateUrl: './alertes.page.html',
  styleUrls: ['./alertes.page.scss'],
})
export class AlertesPage {

  alertes =[];

  constructor(private http: HttpClient,
    private toastCtrl: ToastController) {
    this.readAPI('http://localhost:3000/alertes')
      .subscribe((data) => {
      for(let i = 0; i< data['data'].length ; i++ )
      {
        this.alertes.push(data['data'][i]);
      }
      console.log(this.alertes);
    });
  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

}
