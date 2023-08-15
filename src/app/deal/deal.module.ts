import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DealRoutingModule } from './deal-routing.module';
import { DealComponent } from './deal.component';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { EditComponent } from './edit/edit.component';
import { EditorModule } from 'primeng/editor';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { ChipsModule } from 'primeng/chips';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CheckboxModule } from 'primeng/checkbox';
// import { HtmlToTextPipe } from './edit/html-to-text.pipe';
// import { EditComponent } from './edit/edit.component';
import { HtmlToTextPipe } from '../shared/html-to-text.pipe';

// import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [DealComponent, EditComponent, HtmlToTextPipe],
  imports: [
    CommonModule,
    DealRoutingModule,
    DividerModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    CardModule,
    TabMenuModule,
    StyleClassModule,
    ChipsModule,
    PanelMenuModule,
    CheckboxModule,
  ],
})
export class DealModule {}
