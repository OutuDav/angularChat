import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-logins',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './logins.page.html',
  styleUrl: './logins.page.css',
})
export class LoginPage {}
