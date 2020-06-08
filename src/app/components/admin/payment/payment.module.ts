import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { MatIconModule } from '@angular/material';


@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MatIconModule
  ]
})
export class PaymentModule { }
