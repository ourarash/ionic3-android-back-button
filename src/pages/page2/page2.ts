import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackbuttonService } from '../../services/backbutton.service';
import { EN_TAB_PAGES } from "../../app/app.config";
/**
 * Generated class for the Page2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
})
export class Page2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private backbuttonService: BackbuttonService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Page2Page');
  }
  ionViewWillEnter() {
    this.backbuttonService.pushPage(EN_TAB_PAGES.EN_TP_PLANET, this.navCtrl);
  }

}
