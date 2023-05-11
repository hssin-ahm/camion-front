import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  getActuelBreadcrumbItem,
  getActuelBreadcrumbItemActive,
} from 'src/app/store/shared/shared.selector';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss'],
})
export class PathComponent implements OnInit {
  item: Observable<string> | undefined;
  itemActive: Observable<string> | undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.item = this.store.select(getActuelBreadcrumbItem);
    this.itemActive = this.store.select(getActuelBreadcrumbItemActive);
    // this.itemActive.subscribe((data) => {
    //   console.log(data);
    // });
    // this.item.subscribe((data) => {
    //   console.log(data);
    // });
  }
}
