import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { CurrentUser } from '../model/currentUser.interface';
import { LayoutService } from '../service/layout.service';
import { getMe, getMeStart } from './layout.actions';

@Injectable()
export class LayoutEffects {
  constructor(private action$: Actions, private layoutService: LayoutService) {}

  getMe$ = createEffect(() => {
    //filter the action
    return this.action$.pipe(
      ofType(getMeStart),
      switchMap(() => {
        return this.layoutService.getMe().pipe(
          map((currentUser: CurrentUser) => {
            return getMe({ currentUser });
          })
        );
      })
    );
  });
}
