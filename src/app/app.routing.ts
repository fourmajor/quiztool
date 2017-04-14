import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { NotFoundComponent } from './not-found.component';
import { PostsComponent } from './posts/posts.component';


const appRoutes : Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'posts', component: PostsComponent },
    { path: '**', component: NotFoundComponent }
];

export const appRouting : ModuleWithProviders = RouterModule.forRoot(appRoutes);

