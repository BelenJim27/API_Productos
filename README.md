# Validación de Acceso al Sistema con Consumo de API

Este proyecto implementa un sistema de inicio de sesión que consume una API externa para autenticar a los usuarios. A continuación, se describen las partes clave del código donde se realiza este consumo.
## API Externa Utilizada
- **URL**: https://api.escuelajs.co/api/v1/users
- **Método:** GET
- **Descripción:** Proporciona una lista de usuarios en formato JSON que se utiliza para validar las credenciales.
## **1. Servicio `UserService`**

El servicio `UserService` se encarga de interactuar con la API externa para obtener la lista de usuarios.

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/users'; 

  constructor(private http: HttpClient) {}

  // Obtiene la lista de usuarios desde la API
  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }
}```
**API utilizada:** https://api.escuelajs.co/api/v1/users
**Método implementado:** getUsers (realiza una solicitud GET para obtener todos los usuarios).
## Componente LoginComponent
El componente LoginComponent utiliza el servicio UserService para autenticar usuarios.
Al inicializarse, el componente obtiene la lista de usuarios desde la API.
```typescript
ngOnInit(): void {
  this.userservice.getUsers().subscribe((data) => {
    this.user = Object.values(data);
    console.log(this.user);
  });
}```
## Método iniciarSesion
Valida las credenciales del usuario ingresadas en el formulario contra los datos obtenidos de la API.
```typescript
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
  }```
-  **Búsqueda de usuario**: Se utiliza el método ``find`` para buscar un usuario en la lista que coincida con las credenciales ingresadas.
- **Resultado:**
Si el usuario existe, se redirige al componente sidebar.
Si el usuario no existe, se muestra un mensaje de error con ``MatSnackBar``.

## Interfaz de Usuario (HTML)
El formulario de inicio de sesión permite al usuario ingresar sus credenciales. Los datos ingresados se enlazan a las variables** username** y **password** mediante ``[(ngModel)].``
```typescript
<mat-form-field class="field">
  <mat-label>Correo electrónico</mat-label>
  <input [(ngModel)]="username" type="email" matInput placeholder="Ingresa tu correo">
  <mat-icon matSuffix>email</mat-icon>
</mat-form-field>

<mat-form-field class="field">
  <mat-label>Contraseña</mat-label>
  <input [(ngModel)]="password" type="password" matInput placeholder="Ingresa tu contraseña">
  <mat-icon matSuffix>vpn_key</mat-icon>
</mat-form-field>

<div class="button-container">
  <button class="mat-button button" (click)="iniciarSesion()">Iniciar sesión</button>
</div>
```
Cuando el usuario hace clic en el botón "Iniciar sesión", se ejecuta el método iniciarSesion.

