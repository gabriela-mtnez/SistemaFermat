import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentOrTeacherI } from '../../../shared/models/studentOrTeacher.interface';
import { RegisterService } from '../../../shared/services/register.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  @Input() register: StudentOrTeacherI;

  constructor(private registerSvc: RegisterService) { }

  public editRegisterForm = new FormGroup({
    id: new FormControl('', Validators.required),
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
    this.initValuesForm();
  }

  editRegister(register: StudentOrTeacherI) {
    console.log("Print", register);
    
    this.registerSvc.editRegisterById(register);
  }

  // handleImage(event: any){
  //   this.image = event.target.files[0];
  // }

  private initValuesForm(): void{
    this.editRegisterForm.patchValue({
    id: this.register.id,
    rol: this.register.rol,
    name: this.register.name,
    birthdate: this.register.birthdate,
    email: this.register.email,
    password: this.register.password,
    address: this.register.address,
    phone: this.register.phone,
    average: this.register.average,
    schoolOfOrigin: this.register.schoolOfOrigin,
    option: this.register.option,
    speciality: this.register.speciality
    });
  }

}
