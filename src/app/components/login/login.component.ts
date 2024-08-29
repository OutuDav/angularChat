import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { KeyFilterModule } from 'primeng/keyfilter';

import { ChatService } from '../../core/services/chat.service';
import { User } from '../../core/models/interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    FormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    KeyFilterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  /*
  ToDo:
   - Use Reactive forms
   - Add validators (no empty fields, only alpha-numeric values)
   - Add style for highlight invalid fields
  */
  userName: string = '';
  roomName: string = '';

  constructor(private chatService: ChatService, private router: Router) {}

  joinRoom(): void {
    if (!this.userName || !this.roomName) return;

    const user: User = {
      name: this.userName,
      room: this.roomName,
    };

    this.chatService.setUser(user);

    this.router.navigateByUrl(`room/${this.roomName}`);
  }
}
