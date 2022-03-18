import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { Router } from '@angular/router';

import { LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modifier-alerte',
  templateUrl: './modifier-alerte.page.html',
  styleUrls: ['./modifier-alerte.page.scss'],
})
export class ModifierAlertePage {

  alertes = [];

  alerte: any = {};

  ModifierAlerte: any = {};

  loader: any;
  constructor(
    private http: HttpClient,

    private toastCtrl: ToastController,

    private modalCtrl: ModalController,

    private navparams : NavParams
  ) {
    this.alerte = this.navparams.data;
  }

  ChangeNiveauAlerte(SelectedValue){
    this.alerte.alertes_niveaux_id = SelectedValue;
  }

  ionViewDidEnter() {
    this.fetchUsers();
  }

  fetchUsers() {

    this.http.get("http://localhost:3000/alertes").subscribe((res: any) => {
      console.log(res);
      this.alertes = res.data;
    });
  }

  submit() {
    this.ModifierAlerte = {"alertes_libelle": this.alerte.alertes_libelle,"alertes_description": this.alerte.alertes_description,"alertes_niveaux_id": this.alerte.alertes_niveaux_id}

    this.http.put(`http://localhost:3000/alertes/${this.alerte.alertes_id}`, this.ModifierAlerte).subscribe((res: any) => {
      console.log(res, this.ModifierAlerte);
      this.toastCtrl.create({ duration: 3000, message: "l'Alerte " + this.ModifierAlerte.alertes_libelle + " a été modifié" }).then(t => t.present());
    });
    this.modalCtrl.dismiss(this.ModifierAlerte);
  }


}
