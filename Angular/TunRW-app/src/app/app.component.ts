import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './admin/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TunRW-app';
  private wowSubscription: Subscription;
  constructor(private authService:AuthService,
    private router: Router, private wowService: NgwWowService) {
      this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.wowService.init(); 
          }
      );
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.wowSubscription = this.wowService.itemRevealed$.subscribe(
      (item:HTMLElement) => {
        // do whatever you want with revealed element
      });
  }
  ngOnDestroy() {
    // unsubscribe (if necessary) to WOW observable to prevent memory leaks
    this.wowSubscription.unsubscribe();
  }
}
