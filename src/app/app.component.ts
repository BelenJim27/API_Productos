import { Component } from '@angular/core';
import { RouterOutlet ,RouterLink} from '@angular/router';
import LoginComponent from './bussiness/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SistemaWeb';
}