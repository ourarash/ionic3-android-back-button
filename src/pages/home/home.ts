import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page1Page } from '../../pages/page1/page1';
import { Page2Page } from '../../pages/page2/page2';
import { Page3Page } from '../../pages/page3/page3';
import { Globals } from "../../app/app.config";
import { Tabs } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild("tabs") tabs: Tabs;

  tab1Root = Page1Page;
  tab2Root = Page2Page;
  tab3Root = Page3Page;
  
  constructor(public navCtrl: NavController) {

  }
  
  ionViewDidEnter() {
    Globals.tabs = this.tabs;
  }
}
