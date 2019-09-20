import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StringComponent } from './string/string.component';


const routes: Routes = [
  { path: '', component: StringComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
