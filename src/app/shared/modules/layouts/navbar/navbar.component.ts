import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { logout } from 'src/app/features/auth/state/auth.actions';
import { getMeStart } from '../state/layout.actions';
import { Observable } from 'rxjs';
import { CurrentUser } from '../model/currentUser.interface';
import { curentUserSelector } from '../state/layout.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  curentUser$: Observable<CurrentUser | null>;
  currentUser;
  imgBaseUrl = environment.imgUrl;

  filename: any = this.imgBaseUrl + 'no-photo.png';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initializeValues();
  }
  initializeValues(): void {
    this.store.dispatch(getMeStart());
    this.curentUser$ = this.store.pipe(select(curentUserSelector));
    this.curentUser$.subscribe((data) => {
      this.currentUser = data;
      this.filename = this.imgBaseUrl + this.currentUser?.user?.photo;
    });
  }
  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    this.store.dispatch(logout());
  }
}
