import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../../../shared/components/modal/modal.component';
import { StudentOrTeacherI } from '../../../shared/models/studentOrTeacher.interface';
import { RegisterService } from '../../../shared/services/register.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'birthday', 'phone', 'email', 'address', 'payments', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private registerSVC: RegisterService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.registerSVC.getStudentsRegisters().subscribe(registers => this.dataSource.data = registers);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toDateTime(secs) {
    const yearUnix = 1969;
    const a = new Date(secs * 1000);
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const time = a.getDate() + '/' + months[a.getMonth()] + '/' + (a.getFullYear() - yearUnix);
    return time;
  }

  goToPay(register: StudentOrTeacherI) {
    this.router.navigate(['/admin/payment/' + register.id]);
  }

  onEditRegister(register: StudentOrTeacherI) {
    this.openDialog(register);
    console.log("OnEdit", register);
    
  }

  onDeleteRegister(register: StudentOrTeacherI) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No será posible revertir este cambio.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.registerSVC.deleteRegisterById(register).then(() => {
          Swal.fire(
            'Eliminado',
            'El elemento ha sido eliminado.',
            'success'
          );
        }).catch((error) => {
          Swal.fire(
            'Error ',
            'Ha ocurrido un error al intentar eliminar este elemento.',
            'error'
          );
        });
      }
    });
  }

  openDialog(register?: StudentOrTeacherI): void {
    const config = {
      data: {
        message: register ? 'Editar' : 'Nuevo',
        content: register
      }
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result ${result}');
    });
  }
}
