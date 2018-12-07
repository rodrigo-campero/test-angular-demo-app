import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextMaskModule } from 'angular2-text-mask';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ClientFilterByName } from './client-list/client.pipe';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  declarations: [ClientListComponent, ClientFormComponent, ClientFilterByName]
})
export class ClientModule { }
