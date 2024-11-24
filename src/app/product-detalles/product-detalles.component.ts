import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-product-detalles',
  standalone: true,
  imports: [MatLabel,CommonModule,FormsModule,MatFormFieldModule,
    MatIcon,MatInput,MatButtonModule
  ],
  templateUrl: './product-detalles.component.html',
  styleUrl: './product-detalles.component.css'
})
export class ProductDetallesComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: any; mode: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data.product);
  }
}
