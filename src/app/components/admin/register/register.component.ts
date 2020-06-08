import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentOrTeacherI } from '../../../shared/models/studentOrTeacher.interface';
import { RegisterService } from '../../../shared/services/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private registerSvc: RegisterService, private router: Router) { }

  public newRegisterForm = new FormGroup({
    rol: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    average: new FormControl('', Validators.required),
    schoolOfOrigin: new FormControl('', Validators.required),
    option: new FormControl('', Validators.required),
    speciality: new FormControl('', Validators.required)
  });

  ngOnInit() {
  }

  addNewRegister(data: StudentOrTeacherI) {
    this.registerSvc.saveRegister(data).then((res) => {
      location.reload();
    }).catch(err =>
      Swal.fire(
        'Error ',
        'Ha ocurrido un error al intentar eliminar este elemento.',
        'error'
      )
      );
  }

}
