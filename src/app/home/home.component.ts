import { Component } from '@angular/core'

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent {
    isProfileLoaded: boolean = false;
    constructor() {}

    onProfileLoad(): void {
        this.isProfileLoaded = true;
    }
}