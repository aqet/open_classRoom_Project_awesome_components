import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'social-media', loadChildren: ()=>import('./social-media/social-media.module').then(m=>m.SocialMediaModule)},
    { path: 'complex-form', loadChildren: () => import('./complex-form/complex-form.module').then(m => m.ComplexFormModule) },
    {path: '**', redirectTo: 'social-media'}
];