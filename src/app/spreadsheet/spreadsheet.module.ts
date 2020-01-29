import { NgModule } from "@angular/core";
import { SheetComponent } from './sheet/sheet.component';
import { CellComponent } from './cell/cell.component';
import { SharedModule } from '../shared/shared.module';
import { SpreadsheetComponennt } from './spreadsheet.component';
import { SpreadsheetRoutingModule } from './spreadsheet-routing.module';
import { CommonModule } from '@angular/common';
import { XSrollComponent } from './scroll/x-scroll/x-scroll.component';

@NgModule({
  declarations: [
    SpreadsheetComponennt,
    XSrollComponent,
    SheetComponent,
    CellComponent
  ],
  imports: [
    CommonModule,
    SpreadsheetRoutingModule,
    SharedModule
  ],
  providers: [

  ],
})
export class SpreadSheet { }