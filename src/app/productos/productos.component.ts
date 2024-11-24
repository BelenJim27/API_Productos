import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../services/products.service';
import { CustomPaginatorIntl } from '../services/CustomPaginatorIntl.service';
import { MatIcon } from '@angular/material/icon';
import { ProductDetallesComponent } from '../product-detalles/product-detalles.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone: true,
  
  imports: [CommonModule,MatPaginator,MatTableModule,HttpClientModule,MatIcon,
    MatInputModule,MatFormFieldModule,FormsModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  providers: [ProductService, MatPaginatorIntl,
     { provide: MatPaginatorIntl, 
    useClass: CustomPaginatorIntl }],
  
    

})
export class ProductosComponent {
  products: any[] = [];
  paginatedProducts: any[] = [];
  pageSize: number = 5; 
  pageIndex: number = 0; 
  currentPage: number = 0; 
  filteredProducts: any[] = [];
  searchQuery: string = ''; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private productService: ProductService,private dialog: MatDialog,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = [...this.products]; 
      this.updatePaginatedProducts(); 
    });
  }
  

  filterProducts(): void {
    console.log("Buscando productos:", this.searchQuery);
    
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = [...this.products]; 
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  
    console.log("Productos filtrados:", this.filteredProducts); 
  
    this.currentPage = 0; 
    this.updatePaginatedProducts(); 
  }
  
  
  updatePaginatedProducts(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  
    console.log("Índice de inicio:", startIndex, "Índice de fin:", endIndex);
    console.log("Total productos filtrados:", this.filteredProducts.length);
  
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  
    console.log("Productos paginados:", this.paginatedProducts);
  }
  
  

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedProducts();
  }
  viewProductInfo(product: any): void {
    const dialogRef = this.dialog.open(ProductDetallesComponent, {
      width: '650px',
      data: { product, mode: 'view' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Acción realizada:', result);
      }
    });
  }
  
  editProduct(product: any): void {
    const dialogRef = this.dialog.open(ProductDetallesComponent, {
      width: '500px',
      data: { product, mode: 'edit' },
    });
  
    dialogRef.afterClosed().subscribe((updatedProduct: any) => {
      if (updatedProduct) {
        const index = this.products.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
          this.updatePaginatedProducts();
        }
      }
    });
  }
  

  deleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter((p) => p.id !== productId);
          this.filteredProducts = this.filteredProducts.filter((p) => p.id !== productId);
          this.updatePaginatedProducts();
          this.cdr.detectChanges(); 
        },
        (error) => {
          console.error('Error eliminando el producto:', error);
        }
      );
      
      
    }
  }
  
  
}
