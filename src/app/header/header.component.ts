import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorage } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated=  false
    private userSub: Subscription

    constructor(private dataStorageService: DataStorage, private authService: AuthService) {}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user //same as !user ? false : true 
        })
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe()
    }

    onSaveData() {
        this.dataStorageService.storeRecipes()
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe()
    }

    onLogout() {
        this.authService.logout()
    }
}