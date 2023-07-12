import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatExpansionModule, 
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class SharedModule {}
