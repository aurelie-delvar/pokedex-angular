import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Pokedex',
    },
    {
        path: 'details/:name',
        component: DetailsComponent,
        title: 'Détail du pokemon'
    }
];