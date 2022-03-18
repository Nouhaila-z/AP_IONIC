import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ModalController, NavParams, ToastController, AlertController } from '@ionic/angular';
import { AjouterAlertePage } from '../ajouter-alerte/ajouter-alerte.page';
import { ModifierAlertePage } from '../modifier-alerte/modifier-alerte.page';

@Component({
  selector: 'app-alertes',
  templateUrl: './alertes.page.html',
  styleUrls: ['./alertes.page.scss'],
})
export class AlertesPage {

  alertes = [];

  constructor(private http: HttpClient, private toastCtrl: ToastController, private modalCtrl: ModalController, public alertController: AlertController) {

  }
  readAPI(URL: string) {
    return this.http.get(URL);
  }

  afficherAlertes() {
    this.alertes = [];
    this.readAPI('http://localhost:3000/alertes')
      .subscribe((data) => {
        for (let i = 0; i < data['data'].length; i++) {
          this.alertes.push(data['data'][i]);
        }
        console.log(this.alertes);
      });
  }

  ngOnInit() {
    this.afficherAlertes();
  }
  addAlerte() {
    this.modalCtrl.create({ component: AjouterAlertePage }).then(modalres => { modalres.present(); modalres.onDidDismiss().then(res => { if (res.data != null) { this.afficherAlertes(); } }) })
  }
  UpdateAlerte(alerte) {
    this.modalCtrl.create({ component: ModifierAlertePage, componentProps: alerte }).then(modalres => { modalres.present(); modalres.onDidDismiss().then(res => { if (res.data != null) { this.afficherAlertes(); } }) })
  }

  async DeleteAlerte (id, libelle)
  {
  await this.alertController.create({

    header: "Supprimer l'alerte",

    subHeader: libelle,

    message: "Voulez-vous vraiment supprimer l'alerte ?",

    buttons: [

      {
        text: "Oui", handler: () => {



          this.http.delete(`http://localhost:3000/alertes/${id}`,).subscribe((res: any) => {
            this.afficherAlertes();

            this.toastCtrl.create({ duration: 3000, message: "L'alerte à bien été supprimée." }).then(t => t.present());

          });

        }

      },

      {

        text: "Non"

      }
    ]

  }).then(res => res.present());

}}
