import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PathModule } from 'src/app/shared/modules/path/path.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgxMaskModule } from 'ngx-mask';
import { ClientComponent } from './client.component';
import { ClientListComponent } from './pages/client-list/client-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        component: ClientListComponent,
      },
      {
        path: 'client',
        loadChildren: () =>
          import('./pages/client-details/client-details.module').then(
            (m) => m.ClientDetailsModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [ClientListComponent, ClientComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot({ validation: true }),
    PathModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    FeahterIconModule,
  ],
})
export class ClientModule {}
