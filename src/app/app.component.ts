import { Component, ViewChild } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Platform, MenuController, AlertController, Nav, Tab, ToastController } from "ionic-angular";

import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { Globals, EN_TAB_PAGES } from "../app/app.config";
import { BackbuttonService } from "../services/backbutton.service";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string; component: any }>;
  alert;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private alertController: AlertController,
    public menu: MenuController,
    private backbuttonService: BackbuttonService,
    private toastController: ToastController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [{ title: "List", component: ListPage }];
    this.registerBackButton();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }

  registerBackButton() {
    this.platform.registerBackButtonAction(() => {
      let toast = this.toastController.create({
        message: "Back button pushed!",

        duration: 1000,

        dismissOnPageChange: false,
        position: "middle",
        cssClass:"my-toast",
      });

      toast.present();

      if (this.menu.isOpen()) {
        console.log("Menu is open!", "loggedInMenu");
        this.menu.close();
        console.log("this.menu.isOpen(): " + JSON.stringify(this.menu.isOpen()));
        return;
      }
      console.log("Checking for other pages");

      let checkHomePage = true;
      let max = Globals.navCtrls.length;
      for (let i = 0; i < Globals.navCtrls.length; i++) {
        let n = Globals.navCtrls[i];
        if (n) {
          if (n.canGoBack()) {
            console.log("Breaking the loop i: " + JSON.stringify(i));
            let navParams = n.getActive().getNavParams();
            if (navParams) {
              console.log("navParams exists");
              let resolve = navParams.get("resolve");
              if (resolve) {
                n.pop().then(() => resolve({}));
              } else {
                n.pop();
              }
            } else {
              n.pop();
            }
            checkHomePage = false;
            return;
          }
        } else console.log("n was null!");
      }

      if (this.nav.getActive().instance instanceof HomePage && !this.nav.canGoBack()) {
        let popPageVal = this.backbuttonService.popPage();
        console.log("popPageVal: " + JSON.stringify(popPageVal));
        if (popPageVal >= 0) {
          console.log("Switching the tab to: ", popPageVal);
          this.switchTab(popPageVal);
        } else {
          console.log("Last page is HomePage");

          if (this.alert) {
            this.alert.dismiss();
            this.alert = null;
          } else {
            this.showAlert();
          }
        }
      } else {
        console.log("Last page is not HomePage");
        if (this.nav.canGoBack()) {
          console.log("We can go back!");
          this.nav.pop();
        }
      }
    });
  }

  showAlert() {
    this.alert = this.alertController.create({
      title: "Exit?",
      message: "Are you sure you want to exit?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.alert = null;
          }
        },
        {
          text: "Exit",
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.alert.present();
  }

  switchTab(tabIndex) {
    if (Globals.tabs && tabIndex >= 0) {
      console.log("Switch condition met");
      Globals.tabIndex = tabIndex;
      Globals.tabs.select(tabIndex);
      Globals.tabs.selectedIndex = tabIndex;
    }
  }
}
