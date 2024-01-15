import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';


import { CodersRoutingModule } from './coders-routing.module';
import { CodersComponent } from './coders.component';
import { CreateCoderComponent } from './create-coder/create-coder.component';
import { ReadCoderComponent } from './read-coder/read-coder.component';
import { UpdateCoderComponent } from './update-coder/update-coder.component';
import { DeleteCoderComponent } from './delete-coder/delete-coder.component';
import { ListCodersComponent } from './list-coders/list-coders.component';


@NgModule({
  declarations: [
    CodersComponent,
    CreateCoderComponent,
    ReadCoderComponent,
    UpdateCoderComponent,
    DeleteCoderComponent,
    ListCodersComponent
  ],
  imports: [
    CommonModule,
    CodersRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CodersModule { }
