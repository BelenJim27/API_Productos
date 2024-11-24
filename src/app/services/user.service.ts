  import { Injectable,Inject, PLATFORM_ID } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { isPlatformBrowser } from '@angular/common';

  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiUrl = 'https://api.escuelajs.co/api/v1/users'; 
    private loggedInUser: any = null;

    constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {}
    

      getUsers() {
        return this.http.get<any[]>(this.apiUrl);
      }
      setLoggedInUser(user: any): void {
        if (isPlatformBrowser(this.platformId)) {
          this.loggedInUser = user;
          localStorage.setItem('loggedInUser', JSON.stringify(user)); 
        }
      }
    
      getLoggedInUser(): any {
        if (isPlatformBrowser(this.platformId)) {
          if (!this.loggedInUser) {
            this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
          }
        }
        return this.loggedInUser;
      }
    }
