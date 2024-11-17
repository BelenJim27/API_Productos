import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
/**
 * Componente para mostrar una lista de usuarios en una tabla.
 * La lista de usuarios se obtiene del servicio `UserService`.
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [CommonModule, HttpClientModule, MatTableModule,MatPaginator],
  providers: [UserService],
})
export class UserListComponent implements OnInit {
  users: any[] = [];// Lista completa de usuarios
  paginatedUsers: any[] = [];// Sublista de usuarios para la página actual
  pageSize = 5;// Número de usuarios por página
  pageIndex = 0;// Índice de la página actual


  @ViewChild(MatPaginator) paginator!: MatPaginator;// Referencia al paginador

  constructor(private userService: UserService) {}
/**
   * Se ejecuta al inicializar el componente y carga la lista de usuarios desde el servicio.
   */
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.updatePaginatedUsers();
    });
  }
/**
   * Actualiza la lista `paginatedUsers` según la página y el tamaño seleccionados.
   */
  updatePaginatedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, startIndex + this.pageSize);
  }
/**
   * Maneja los cambios en la paginación y actualiza la sublista de usuarios.
   * @param event Evento de cambio de página
   */
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers();
  }
}