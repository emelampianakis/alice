import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './core/layout/shell-layout.component';
import { langGuard } from './core/i18n/lang.guard';

export const routes: Routes = [
  {
    path: ':lang',
    canActivate: [langGuard],
    component: ShellLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'programs',
        loadComponent: () =>
          import('./features/programs/programs.component').then((m) => m.ProgramsComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.component').then((m) => m.ContactComponent),
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'en' },
  { path: '**', redirectTo: 'en' },
];
