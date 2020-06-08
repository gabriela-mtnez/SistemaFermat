import { Component, OnInit } from '@angular/core';
import { isUndefined } from 'util';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public opened = false;
  public rolBool = null;
  constructor(private authService: AuthService, private registerSvc: RegisterService) { }

  ngOnInit() {
    this.getRol();
  }

  getRol() {
    this.authService.isAuth().subscribe(auth => {
      this.registerSvc.getRolUser(auth.email).subscribe(data => {
        const rol = isUndefined(data[0]) ? 'admin' : data[0].rol;
        this.rolBool = (rol === 'admin');
      });
    });
  }

}
