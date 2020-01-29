import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SpreadsheetComponennt } from './spreadsheet.component';

const routes: Routes = [
  { path: '', component: SpreadsheetComponennt }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]  
})
export class SpreadsheetRoutingModule { }