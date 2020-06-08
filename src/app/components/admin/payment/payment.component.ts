import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from 'src/app/shared/services/register.service';
import { StudentOrTeacherI } from 'src/app/shared/models/studentOrTeacher.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private route: ActivatedRoute, private registerSVC: RegisterService) { }
  data: StudentOrTeacherI;
  totalCoursePrice = 3000;
  payment = this.totalCoursePrice;
  paymentData: object;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('register');
    this.registerSVC.getRegisterById(id).subscribe(data => {
      this.data = data;
      this.data.id = id;
      this.getMoneyOwed(this.data.id);
    });
  }

  toDateTime(secs) {
    const yearUnix = 1969;
    const a = new Date(secs * 1000);
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const time = a.getDate() + '/' + months[a.getMonth()] + '/' + (a.getFullYear() - yearUnix);
    return time;
  }

  getMoneyOwed(id) {
    this.registerSVC.getMoneyData(id).subscribe(data => {
      let sum = 0;
      this.paymentData = this.sortJSON(data, 'date', 'asc');
      data.forEach(json => { sum = sum + json.payment; });
      this.payment = this.totalCoursePrice - sum;
      (<HTMLInputElement>document.getElementById('paymentt')).value = '';
    });
  }

  sortJSON(data, key, orden) {
    return data.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      if (orden === 'asc') {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
      if (orden === 'desc') {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }

  savePayment() {
    let moneyToSave = parseInt((<HTMLInputElement>document.getElementById('paymentt')).value);
    moneyToSave = isNaN(moneyToSave) ? 0 : moneyToSave;
    if (this.payment < moneyToSave) {
      Swal.fire(
        'Cuidado',
        'No se permite ingresar una cantidad mayor al saldo restante.',
        'warning'
      );
    } else if (moneyToSave <= 0) {
      Swal.fire(
        'Cuidado',
        'No se puede abonar esta cantidad, verifiquelo e intentelo de nuevo.',
        'warning'
      );
    } else {
      Swal.fire({
        title: 'Se abonará $' + moneyToSave + ' a la cuenta',
        text: '¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          const obj = {
            date: new Date(),
            payment: moneyToSave,
            studentId: this.data.id
          };
          this.registerSVC.saveMoney(obj).then(() => {
            Swal.fire(
              'Abonado',
              'La cantidad se ha abonado con exito.',
              'success'
            );
            this.getMoneyOwed(this.data.id);
          }).catch((error) => {
            Swal.fire(
              'Error ',
              'Ha ocurrido un error al intentar abonar la cantidad.',
              'error'
            );
          });
        }
      });
    }
  }

}
