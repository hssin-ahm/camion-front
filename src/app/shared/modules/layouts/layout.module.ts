import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BaseComponent } from './base/base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import {
  NgbDropdownModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ContentAnimateDirective } from 'src/app/core/content-animate/content-animate.directive';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from './state/layout.effects';
import { StoreModule } from '@ngrx/store';
import { LAYOUT_STATE_NAME } from './state/layout.selector';
import { LayoutReducer } from './state/layout.reducer';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    BaseComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ContentAnimateDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbDropdownModule,
    NgbCollapseModule,
    PerfectScrollbarModule,
    FeahterIconModule,
    EffectsModule.forFeature([LayoutEffects]),
    StoreModule.forFeature(LAYOUT_STATE_NAME, LayoutReducer),
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class LayoutModule {}
