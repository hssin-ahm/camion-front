import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './shared/modules/layouts/base/base.component';
import { AuthGuard } from './features/auth/guard/auth.guard';
import { LoginGuard } from './features/auth/guard/login.guard';
import { ErrorPageComponent } from './features/error/error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'trucks',
        loadChildren: () =>
          import('./features/truck/truck.module').then((m) => m.TruckModule),
      },
      {
        path: 'drivers',
        loadChildren: () =>
          import('./features/driver/driver.module').then((m) => m.DriverModule),
      },
      {
        path: 'missions',
        loadChildren: () =>
          import('./features/mission/mission.module').then(
            (m) => m.MissionModule
          ),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./features/clients/client.module').then(
            (m) => m.ClientModule
          ),
      },
    ],
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    data: { roles: ['super_admin', 'admin'] },
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./features/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'admins',
    component: BaseComponent,
    canActivate: [AuthGuard],
    data: { roles: ['super_admin'] },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/admin-crud/admin-crud.module').then(
            (m) => m.AdminCrudModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LoginGuard],
  },

  {
    path: 'error/:type',
    component: ErrorPageComponent,
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent,
  },
  { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
