import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Pokedex',
    },
    {
        path: 'details/:name',
        component: DetailsComponent,
        title: 'Pokemon\'s Details'
    },
    {
        path: 'submit-pokemon',
        component: FormComponent,
        title: 'Submit your own Pokemon!'
    }
];