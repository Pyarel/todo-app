import { NgModule } from "@angular/core";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({

  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule{

}
