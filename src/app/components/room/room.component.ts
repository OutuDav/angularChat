import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ChatService } from '../../core/services/chat.service';
import { Log, User } from '../../core/models/interfaces';
import { LogValidatorsService } from '../../core/services/log-validator.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ChipModule,
    CommonModule,
    InputTextareaModule,
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent implements OnInit, OnDestroy {
  user: User;
  logs$: Observable<Log[]>;

  constructor(
    protected logValidator: LogValidatorsService,
    private chatService: ChatService,
    private router: Router
  ) {
    this.user = this.chatService.getUser();
    this.logs$ = this.chatService.getRoomLogs(this.user.room, new Date());
  }

  ngOnInit(): void {
    this.chatService.enterOrLeaveRoom('enter');
  }

  ngOnDestroy(): void {
    this.chatService.enterOrLeaveRoom('leave');
  }

  sendMessage(textArea: HTMLTextAreaElement, event: Event) {
    event.preventDefault();

    if (textArea.value === '') return;

    this.chatService.sendMessage(textArea.value);

    textArea.value = '';
  }

  exitRoom(): void {
    this.router.navigateByUrl(`login`);
  }
}
