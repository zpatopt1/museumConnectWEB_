import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodersComponent } from './coders.component';
import { CreateCoderComponent } from './create-coder/create-coder.component';
import { UpdateCoderComponent } from './update-coder/update-coder.component';
import { ReadCoderComponent } from './read-coder/read-coder.component';
import { DeleteCoderComponent } from './delete-coder/delete-coder.component';
import { ListCodersComponent } from './list-coders/list-coders.component';

const routes: Routes = [
  { path: '', component: CodersComponent },
  { path: 'create-coder', component: CreateCoderComponent },
  { path: 'update-coder', component: UpdateCoderComponent },
  { path: 'read-coder', component: ReadCoderComponent },
  { path: 'delete-coder', component: DeleteCoderComponent },
  { path: 'list-coders', component: ListCodersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodersRoutingModule { }
