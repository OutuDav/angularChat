import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import { Log } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class LogValidatorsService {
  constructor(private chatService: ChatService) {}

  isNotification(log: Log): boolean {
    return log.type === 'notification';
  }

  isUser(log: Log): boolean {
    const currentUser = this.chatService.getUser();

    return log.user?.name === currentUser.name;
  }
}
