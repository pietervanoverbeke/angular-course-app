import { Component, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true
    signupSubscription: Subscription
    isLoading = false
    error: string = null

    constructor(private authService: AuthService, private router: Router) {}

    ngOnDestroy(): void {
        if (this.signupSubscription) {
            this.signupSubscription.unsubscribe()
        }
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return
        }

        let authObservable: Observable<AuthResponseData>
        this.isLoading = true
        if (this.isLoginMode) {
            authObservable = this.authService.login(form.value.email, form.value.password)
        } else {
            authObservable = this.authService.signup(form.value.email, form.value.password)
            
        }
        
        this.signupSubscription = authObservable.subscribe(responseData => {
            console.log(responseData);
            this.isLoading = false
            this.router.navigate(['/recipes'])
        }, errorMessage => {
            this.error = errorMessage
            this.isLoading = false
        })

        form.reset()
        
    }
}