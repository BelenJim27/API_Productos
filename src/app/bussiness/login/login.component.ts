import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],  
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatSnackBarModule

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {
  
  
  constructor(private router: Router, private userservice: UserService, private snackBar: MatSnackBar) {}

    username='';
    password='';
    user: Array<any>=[]; 
    ngOnInit(): void {
      this.userservice.getUsers().subscribe((data)=> {
      this.user = Object.values(data);
      console.log(this.user);
      });
    }
    iniciarSesion() {
      const UsuarioExistente = this.user.find(
        (user) => user.email === this.username && user.password === this.password
      ); 
      if (UsuarioExistente) {
        console.log("Login exitoso");
        this.router.navigate(['/sidebar']);
      } else {
        console.log("Usuario no encontrado");
        this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
          duration: 3000, 
          horizontalPosition: 'center',
          verticalPosition: 'top', 
        });
      }
    }
    
  

  registrar() {
    this.router.navigate(['/sidebar']);
  }
}
