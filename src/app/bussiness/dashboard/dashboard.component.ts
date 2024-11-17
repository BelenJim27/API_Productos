import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

interface Image {
  src: string;
  titulo: string;
  descripcion: string;
  precio: string;
  cantidad: number;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  images = [
    { src: 'assets/img/imagen1.jpg', titulo: 'Ramo 1', descripcion: 'Ramo de 3 tulipanes', precio: '$210', cantidad: 5 },
    { src: 'assets/img/imagen2.jpg', titulo: 'Ramo 2', descripcion: 'Ramo de 2 rosas y un girasol', precio: '$320', cantidad: 3 },
    { src: 'assets/img/imagen3.jpg', titulo: 'Ramo 3', descripcion: 'ramo de 2 rosas y un tulipan', precio:'$230', cantidad: 8 },
    // Más imágenes...
  ];

  // Método para mostrar detalles de una imagen
  showDetails(image: Image): void {
    alert(`Detalles:\nTítulo: ${image.titulo}\nDescripción: ${image.descripcion}\nPrecio: ${image.precio}\nCantidad Disponible: ${image.cantidad}`);
  }
}
