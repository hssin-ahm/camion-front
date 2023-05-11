import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/app/shared/modules/layouts/model/currentUser.interface';
import { getMeStart } from 'src/app/shared/modules/layouts/state/layout.actions';
import { curentUserSelector } from 'src/app/shared/modules/layouts/state/layout.selector';
import { AppState } from 'src/app/store/app.state';
import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { environment } from 'src/environments/environment';
import { changeUserPassword } from '../../state/user.actions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  imgBaseUrl = environment.imgUrl;

  curentUser$: Observable<CurrentUser | null>;
  currentUser: any;

  filename;
  ngOnInit(): void {
    this.initializeValues();
    this.changeBreadcrumb();
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'User',
        itemActive: 'Change password',
      })
    );
  }
  initializeValues(): void {
    // this.store.dispatch(getMeStart());
    this.curentUser$ = this.store.pipe(select(curentUserSelector));
    this.curentUser$.subscribe((data) => {
      this.currentUser = data?.user;
      this.filename = this.imgBaseUrl + this.currentUser?.photo;
    });
  }

  resetPassword(resetPassForm: NgForm) {
    const password = resetPassForm.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(changeUserPassword({ password }));
    resetPassForm.reset();
  }
}
