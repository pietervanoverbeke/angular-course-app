import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.authService.autoLogin()
    this.loggingService.printLog('Hello form app component ngOnInit')
  }


}
